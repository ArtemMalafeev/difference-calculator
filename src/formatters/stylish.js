import _ from 'lodash';

const indentSymbol = ' ';
const indentSize = 2;
const baseIndentSize = 2;

const makeIndent = (depth) => `${indentSymbol.repeat(depth)}`;

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const currentIndent = makeIndent(depth * indentSize + baseIndentSize);
    const closeIndent = makeIndent(depth * indentSize - baseIndentSize);

    const node = Object
      .entries(data)
      .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 2)}`);

    return ['{', ...node, `${closeIndent}}`]
      .join('\n');
  }

  return data;
};

const format = (node, depth) => {
  const {
    key, value, type, oldValue, newValue,
  } = node;
  const currentIndent = makeIndent(depth * indentSize);

  const addedType = () => `${currentIndent}+ ${key}: ${stringify(value, depth + 2)}`;
  const removedType = () => `${currentIndent}- ${key}: ${stringify(value, depth + 2)}`;
  const changedType = () => ([
    `${currentIndent}- ${key}: ${stringify(oldValue, depth + 2)}`,
    `${currentIndent}+ ${key}: ${stringify(newValue, depth + 2)}`,
  ]
    .join('\n')
  );
  const unchangedType = () => `${currentIndent}  ${key}: ${value}`;

  const renders = {
    added: addedType,
    removed: removedType,
    changed: changedType,
    unchanged: unchangedType,
  };

  if (!_.has(renders, type)) {
    throw new Error(`Type '${type}' is undefined`);
  }

  return renders[type]();
};

const build = (astTree) => {
  const iter = (innerAst, depth = 1) => {
    const result = innerAst
      .map((node) => {
        const { key, children, type } = node;

        if (type === 'nested') {
          const inner = iter(children, depth + 2);
          const currentIndent = makeIndent(depth * indentSize + baseIndentSize);

          return `${currentIndent}${key}: ${inner}`;
        }

        return format(node, depth);
      });

    const closeIndent = makeIndent(depth * indentSize - baseIndentSize);

    return ['{', ...result, `${closeIndent}}`]
      .join('\n');
  };

  return iter(astTree);
};

export default (astTree) => build(astTree);
