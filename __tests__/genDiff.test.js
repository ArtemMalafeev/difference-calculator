import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';

import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'stylish',
    expected: fs.readFileSync(getFixturePath('stylish-result.txt')).toString(),
  },
  {
    file1: getFixturePath('file1.yml'),
    file2: getFixturePath('file2.json'),
    format: 'plain',
    expected: fs.readFileSync(getFixturePath('plain-result.txt')).toString(),
  }])('genDiff', ({
  file1, file2, format, expected,
}) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
