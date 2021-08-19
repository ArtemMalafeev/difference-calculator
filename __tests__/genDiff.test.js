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
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('diffYAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(genDiff(file1, file2)).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

// test('incorrect file1 path', () => {
//   const path1 = getFixturePath('file3.json');
//   const path2 = getFixturePath('file2.json');
//
//   expect(() => {
//     genDiff(path1, path2);
//   }).toThrowError(`Path ${path1} not found!`);
// });

// test('incorrect file2 path', () => {
//   const path1 = getFixturePath('file1.json');
//   const path2 = getFixturePath('file4.json');
//
//   expect(() => {
//     genDiff(path1, path2);
//   }).toThrowError(`Path ${path2} not found!`);
// });
//
// test('incorrect file1 ext', () => {
//   const path1 = getFixturePath('file3.txt');
//   const path2 = getFixturePath('file2.json');
//
//   expect(() => {
//     genDiff(path1, path2);
//   }).toThrowError('File extension "txt" not found!');
// });
//
// test('incorrect file2 ext', () => {
//   const path1 = getFixturePath('file1.json');
//   const path2 = getFixturePath('file3.txt');
//
//   expect(() => {
//     genDiff(path1, path2);
//   }).toThrowError('File extension "txt" not found!');
// });
