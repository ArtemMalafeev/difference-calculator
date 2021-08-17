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

test('diffYAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

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
  const path1 = getFixturePath('file3.json');
  const path2 = getFixturePath('file2.json');

  expect(() => {
    genDiff(path1, path2);
  }).toThrowError(`Path ${path1} not found!`);
});

test('incorrect file2 path', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file4.json');

  expect(() => {
    genDiff(path1, path2);
  }).toThrowError(`Path ${path2} not found!`);
});

test('incorrect file1 ext', () => {
  const path1 = getFixturePath('file3.txt');
  const path2 = getFixturePath('file2.json');

  expect(() => {
    genDiff(path1, path2);
  }).toThrowError('File extension "txt" not found!');
});

test('incorrect file2 ext', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file3.txt');

  expect(() => {
    genDiff(path1, path2);
  }).toThrowError('File extension "txt" not found!');
});
