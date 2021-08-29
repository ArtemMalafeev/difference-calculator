import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
  json: (data) => JSON.parse(data),
};

export default (data, ext) => {
  if (!_.has(parsers, ext)) {
    throw new Error(`Ext '${ext}' not found!`);
  }

  return parsers[ext](data);
};
