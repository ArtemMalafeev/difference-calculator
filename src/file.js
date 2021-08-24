import { existsSync, readFileSync } from 'fs';
import { extname, resolve } from 'path';

export const getFilePath = (path) => {
  if (existsSync(path)) {
    return path;
  }

  const absolutePath = resolve(process.cwd(), path);

  if (!existsSync(absolutePath)) {
    throw new Error(`Path '${path}' not found!`);
  }

  return absolutePath;
};

export const getFileData = (path) => {
  const data = readFileSync(path).toString();
  const ext = extname(path).slice(1);

  return [data, ext];
};
