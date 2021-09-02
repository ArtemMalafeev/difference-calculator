import _ from 'lodash';

const indentSymbol = ' ';
const indentSize = 2;
const baseIndentSize = 4;

const makeIndent = (depth) => `${indentSymbol.repeat(depth)}`;

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const currentIndent = makeIndent(depth * baseIndentSize + indentSize);
    const closeIndent = makeIndent(depth * baseIndentSize);

    const node = Object
      .entries(data)
      .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

    return ['{', ...node, `${closeIndent}}`]
      .join('\n');
  }

  return data;
};

const format = (node, depth) => {
  const {
    key, value, type, oldValue, newValue,
  } = node;
  const currentIndent = makeIndent(depth * baseIndentSize + indentSize);

  const addedType = () => `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
  const removedType = () => `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
  const changedType = () => ([
    `${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
    `${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`,
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
  const iter = (innerAst, depth = 0) => {
    const result = innerAst
      .map((node) => {
        const { key, children, type } = node;

        if (type === 'nested') {
          const inner = iter(children, depth + 1);
          const currentIndent = makeIndent(depth * baseIndentSize + indentSize);

          return `${currentIndent}  ${key}: ${inner}`;
        }

        return format(node, depth);
      });

    const closeIndent = makeIndent(depth * baseIndentSize);

    return ['{', ...result, `${closeIndent}}`]
      .join('\n');
  };

  return iter(astTree);
};

export default (astTree) => build(astTree);
