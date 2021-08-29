import _ from 'lodash';

const buildAST = (firstObject, secondObject) => {
  const keys = _.sortBy(_.union(_.keys(firstObject), _.keys(secondObject)));

  return keys
    .map((key) => {
      if (!_.has(firstObject, key)) {
        return { key, value: secondObject[key], type: 'added' };
      }

      if (!_.has(secondObject, key)) {
        return { key, value: firstObject[key], type: 'removed' };
      }

      const value1 = firstObject[key];
      const value2 = secondObject[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { key, children: buildAST(value1, value2), type: 'nested' };
      }

      if (_.isEqual(value1, value2)) {
        return { key, value: value1, type: 'unchanged' };
      }

      return { key, value: [value1, value2], type: 'changed' };
    });
};

export default buildAST;
