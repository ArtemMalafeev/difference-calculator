import _ from 'lodash';

const makeIndent = (depth, symbol = ' ') => `${'    '.repeat(depth)}  ${symbol} `;

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const indent = makeIndent(depth);

    const node = keys
      .map((key) => `${indent}    ${key}: ${stringify(value[key], depth + 1)}`)
      .join('\n');

    return `{\n${node}\n${indent}}`;
  }

  return value;
};

const format = (depth, key, value, status) => {
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

  return renders[status]();
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

        return format(depth, node.key, node.value, node.type);
      });

    return result.join('\n');
  };

  return iter(astTree, 0);
};

export default (astTree) => `{\n${build(astTree)}\n}`;
