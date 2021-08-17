import { existsSync, readFileSync } from 'fs';
import { extname, resolve } from 'path';

export const getFilePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = resolve(process.cwd(), path);

  return existsSync(absolutePath);
};

export const getFileData = (path) => {
  const data = readFileSync(path).toString();
  const ext = extname(path).slice(1);

  return [data, ext];
};
