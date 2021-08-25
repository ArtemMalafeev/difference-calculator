import { existsSync, readFileSync } from 'fs';
import { extname, resolve } from 'path';

export const getFilePath = (filePath) => {
  if (existsSync(filePath)) {
    return filePath;
  }

  const absolutePath = resolve(process.cwd(), filePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Path '${filePath}' not found!`);
  }

  return absolutePath;
};

export const getFileData = (filePath) => {
  const data = readFileSync(filePath).toString();
  const ext = extname(filePath).slice(1);

  return [data, ext];
};
