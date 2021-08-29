import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const format = (path, value, status) => {
  const addedType = () => `Property '${path}' was added with value: ${stringify(value)}`;
  const removedType = () => `Property '${path}' was removed`;
  const changedType = () => {
    const [value1, value2] = value;
    const removed = stringify(value1);
    const added = stringify(value2);
    return `Property '${path}' was updated. From ${removed} to ${added}`;
  };
  const unchangedType = () => '';

  const renders = {
    added: addedType,
    removed: removedType,
    changed: changedType,
    unchanged: unchangedType,
  };

  return renders[status]();
};

const build = (astTree) => {
  const iter = (innerAst, path) => {
    const result = innerAst
      .map((node) => {
        const currentPath = [...path, node.key];

        if (node.type === 'nested') {
          return iter(node.children, currentPath);
        }

        return format(currentPath.join('.'), node.value, node.type);
      })
      .filter((line) => line !== '');

    return result.join('\n');
  };

  return iter(astTree, []);
};

export default (astTree) => build(astTree);
