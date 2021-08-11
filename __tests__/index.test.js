import genDiff from '../index.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diffJSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2)).toEqual('{\n' +
      '  - follow: false\n' +
      '    host: hexlet.io\n' +
      '  - proxy: 123.234.53.22\n' +
      '  - timeout: 50\n' +
      '  + timeout: 20\n' +
      '  + verbose: true \n' +
      '}');
});

test('incorrect file path', () => {
  const file1 = getFixturePath('file3.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2))
      .toEqual(`incorrect ${file1}`);
});
