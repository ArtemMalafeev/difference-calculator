import _ from 'lodash';

const makeIndent = (depth, symbol = ' ') => `${'    '.repeat(depth)}  ${symbol} `;

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const indent = makeIndent(depth);
    const node = Object
      .entries(data)
      .map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`)
      .join('\n');

    return `{\n${node}\n${indent}}`;
  }

  return data;
};

const format = (depth, { key, value, type }) => {
  const addedType = () => {
    const indent = makeIndent(depth, '+');
    return `${indent}${key}: ${stringify(value, depth)}`;
  };

  const removedType = () => {
    const indent = makeIndent(depth, '-');
    return `${indent}${key}: ${stringify(value, depth)}`;
  };

  const changedType = () => {
    const [value1, value2] = value;
    const removedIndent = makeIndent(depth, '-');
    const addedIndent = makeIndent(depth, '+');
    return `${removedIndent}${key}: ${stringify(value1, depth)}\n${addedIndent}${key}: ${stringify(value2, depth)}`;
  };

  const unchangedType = () => {
    const indent = makeIndent(depth);
    return `${indent}${key}: ${value}`;
  };

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
  const iter = (innerAst, depth) => {
    const result = innerAst
      .map((node) => {
        if (node.type === 'nested') {
          const element = iter(node.children, depth + 1);
          const indent = makeIndent(depth);

          return `${indent}${node.key}: {\n${element}\n${indent}}`;
        }

        return format(depth, node);
      });

    return result.join('\n');
  };

  return iter(astTree, 0);
};

export default (astTree) => ['{', build(astTree), '}'].join('\n');
