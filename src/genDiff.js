import { resolve, extname } from 'path';
import { existsSync, readFileSync } from 'fs';
import _ from 'lodash';
import parser from './parsers.js';

const getFilePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = resolve(process.cwd(), path);

  return existsSync(absolutePath);
};

const getFileData = (path) => {
  const data = readFileSync(path);
  const ext = extname(path);

  return parser(data, ext);
}

const genDiff = (path1, path2) => {
  const existPath1 = getFilePath(path1);
  const existPath2 = getFilePath(path2);

  if (!existPath1) {
    return `incorrect ${path1}`;
  }

  if (!existPath2) {
    return `incorrect ${path2}`;
  }

  const data1 = getFileData(path1);
  const data2 = getFileData(path2);

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
