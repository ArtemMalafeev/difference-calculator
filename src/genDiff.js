import parser from './parsers.js';
import { getFileContent, getFilePath, getFileExt } from './file-utils.js';
import buildAST from './genAST.js';
import genToFormat from './formatters/index.js';

const getFileData = (filePath) => {
  const absolutePath = getFilePath(filePath);

  const content = getFileContent(absolutePath);
  const ext = getFileExt(absolutePath);

  return parser(content, ext);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const parserData1 = getFileData(filePath1);
  const parserData2 = getFileData(filePath2);

  const astTree = buildAST(parserData1, parserData2);

  return genToFormat(astTree, formatName);
};

export default genDiff;
