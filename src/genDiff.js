import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import _ from 'lodash';

const getFilePath = (filepath) => {
  if (existsSync(filepath)) {
    return filepath;
  }

  const absolutePath = resolve(process.cwd(), filepath);

  return existsSync(absolutePath);
};

const genDiff = (filepath1, filepath2) => {
  const existFilePath1 = getFilePath(filepath1);
  const existFilePath2 = getFilePath(filepath2);

  if (!existFilePath1) {
    return `incorrect ${filepath1}`;
  }

  if (!existFilePath2) {
    return `incorrect ${filepath2}`;
  }

  const file1 = readFileSync(filepath1);
  const file2 = readFileSync(filepath2);

  const data1 = JSON.parse(file1.toString());
  const data2 = JSON.parse(file2.toString());

  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

  const diff = keys.reduce((acc, key) => {
    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);

    if (value1 === value2) {
      return [...acc, [`  ${key}`, value1]];
    }

    return [
      ...acc,
      [`- ${key}`, value1],
      [`+ ${key}`, value2],
    ];
  }, [])
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  ${key}: ${value}`).join('\n');

  return `{\n${diff} \n}`;
};

export default genDiff;
