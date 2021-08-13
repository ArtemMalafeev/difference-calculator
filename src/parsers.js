import yaml from 'js-yaml';


export default (data, fileExt) => {
  if (fileExt === '.json') {
    return JSON.parse(data.toString());
  }

  if (fileExt === '.yml' || fileExt === '.yaml') {
    return yaml.load(data);
  }
};
