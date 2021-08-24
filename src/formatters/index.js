import _ from 'lodash';

import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

export default (ast, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Format '${format}' not found!`);
  }

  return _.get(formatters, format)(ast);
};
