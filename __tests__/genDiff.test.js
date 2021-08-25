import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultStylish = fs.readFileSync(getFixturePath('stylish-result.txt')).toString();
const resultPlain = fs.readFileSync(getFixturePath('plain-result.txt')).toString();

test('difStylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2, 'stylish')).toEqual(resultStylish);
});

test('diffPlain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain);
});
