import _ from 'lodash';

const makeIndent = (depth, symbol = ' ') => `${'    '.repeat(depth)}  ${symbol} `;

const normalize = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const indent = makeIndent(depth);

    const node = keys
      .map((key) => `${indent}    ${key}: ${normalize(value[key], depth + 1)}`)
      .join('\n');

    return `{\n${node}\n${indent}}`;
  }

  return value;
};

const render = (depth, key, value, status) => {
  const addedType = () => {
    const indent = makeIndent(depth, '+');
    return `${indent}${key}: ${normalize(value, depth)}`;
  };

  const removedType = () => {
    const indent = makeIndent(depth, '-');
    return `${indent}${key}: ${normalize(value, depth)}`;
  };

  const changedType = () => {
    const [value1, value2] = value;
    const removedIndent = makeIndent(depth, '-');
    const addedIndent = makeIndent(depth, '+');
    return `${removedIndent}${key}: ${normalize(value1, depth)}\n${addedIndent}${key}: ${normalize(value2, depth)}`;
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

const build = (ast, depth = 0) => {
  const result = ast
    .map((node) => {
      const { key, value, status } = node;

      if (status === 'object') {
        const element = build(value, depth + 1);
        const indent = makeIndent(depth);

        return `${indent}${key}: {\n${element}\n${indent}}`;
      }

      return render(depth, key, value, status);
    });

  return result.join('\n');
};

export default (ast) => `{\n${build(ast)}\n}`;
