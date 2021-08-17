import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';

import { getFileData } from '../src/file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getFileData', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file1.yml');

  expect(getFileData(file1)).toEqual([
    `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`,
    'json',
  ]);

  expect(getFileData(file2)).toEqual([
    'host: "hexlet.io"\ntimeout: 50\nproxy: "123.234.53.22"\nfollow: false',
    'yml',
  ]);
});
