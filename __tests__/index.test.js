import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diffJSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true 
}`);
});

test('incorrect file1 path', () => {
  const file1 = getFixturePath('file3.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2))
    .toEqual(`incorrect ${file1}`);
});

test('incorrect file2 path', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file4.json');

  expect(genDiff(file1, file2))
      .toEqual(`incorrect ${file2}`);
});