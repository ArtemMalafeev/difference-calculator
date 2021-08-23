import _ from 'lodash';

const initialNode = (key, value, status) => ({ key, value, status });

const buildAST = (tree1, tree2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(tree1), ...Object.keys(tree2)]));

  return keys.map((key) => {
    if (!_.has(tree1, key)) {
      return initialNode(key, _.get(tree2, key), 'added');
    }

    if (!_.has(tree2, key)) {
      return initialNode(key, _.get(tree1, key), 'removed');
    }

    const value1 = _.get(tree1, key);
    const value2 = _.get(tree2, key);

    if (_.isObject(value1) && _.isObject(value2)) {
      return initialNode(key, buildAST(value1, value2), 'object');
    }

    if (value1 === value2) {
      return initialNode(key, value1, 'unchanged');
    }

    return initialNode(key, [value1, value2], 'changed');
  });
};

export default buildAST;
