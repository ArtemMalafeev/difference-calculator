import _ from 'lodash';
import parser from './parsers.js';
import { getFilePath, getFileData } from './file.js';

const genDiff = (path1, path2) => {
  const existPath1 = getFilePath(path1);

  if (!existPath1) {
    throw new Error(`Path ${path1} not found!`);
  }

  const existPath2 = getFilePath(path2);

  if (!existPath2) {
    throw new Error(`Path ${path2} not found!`);
  }

  const [content1, ext1] = getFileData(path1);
  const [content2, ext2] = getFileData(path2);

  const parserData1 = parser(content1, ext1);

  if (!parserData1) {
    throw new Error(`File extension "${ext1}" not found!`);
  }

  const parserData2 = parser(content2, ext2);

  if (!parserData2) {
    throw new Error(`File extension "${ext2}" not found!`);
  }

  const keys = _.sortBy(_.uniq([...Object.keys(parserData1), ...Object.keys(parserData2)]));

  const diff = keys.reduce((acc, key) => {
    const value1 = _.get(parserData1, key);
    const value2 = _.get(parserData2, key);

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
