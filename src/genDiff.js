import parser from './parsers.js';
import { getFileData, getFilePath } from './file.js';
import buildAST from './ast.js';
import makeTree from './stylish.js';

const genDiff = (path1, path2, format = 'stylish') => {
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

  const ast = buildAST(parserData1, parserData2);

  return makeTree(ast, format);
};

export default genDiff;
