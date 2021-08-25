import parser from './parsers.js';
import { getFileData, getFilePath } from './file.js';
import buildAST from './genAST.js';
import genToFormat from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const [contentFile1, extFile1] = getFileData(getFilePath(filePath1));
  const [contentFile2, extFile2] = getFileData(getFilePath(filePath2));

  const parserData1 = parser(contentFile1, extFile1);
  const parserData2 = parser(contentFile2, extFile2);

  const astTree = buildAST(parserData1, parserData2);

  return genToFormat(astTree, formatName);
};

export default genDiff;
