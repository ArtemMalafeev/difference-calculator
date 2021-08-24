import parser from './parsers.js';
import { getFileData, getFilePath } from './file.js';
import buildAST from './genAST.js';
import genToFormat from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const [content1, ext1] = getFileData(getFilePath(path1));
  const [content2, ext2] = getFileData(getFilePath(path2));

  const parserData1 = parser(content1, ext1);
  const parserData2 = parser(content2, ext2);

  const ast = buildAST(parserData1, parserData2);

  return genToFormat(ast, formatName);
};

export default genDiff;
