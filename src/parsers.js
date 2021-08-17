import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
  json: (data) => JSON.parse(data),
};

export default (data, ext) => {
  const isParser = _.has(parsers, ext);

  return isParser ? parsers[ext](data) : isParser;
};
