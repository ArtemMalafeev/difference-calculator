import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const render = (path, value, status) => {
  const addedType = () => `Property '${path}' was added with value: ${normalize(value)}`;
  const removedType = () => `Property '${path}' was removed`;
  const changedType = () => {
    const [value1, value2] = value;
    const removed = normalize(value1);
    const added = normalize(value2);
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

const build = (ast, path = []) => {
  const result = ast
    .map((node) => {
      const { key, value, status } = node;
      const currentPath = [...path, key];

      if (status === 'object') {
        return build(value, currentPath);
      }

      return render(currentPath.join('.'), value, status);
    })
    .filter((line) => line !== '');

  return result.join('\n');
};

export default (ast) => build(ast);
