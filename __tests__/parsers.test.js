import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';

import parsers from '../src/parsers.js';
import { getFileData } from '../src/file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('CorrectParsers', () => {
  const fileJSON = getFixturePath('file1.json');
  const fileYML = getFixturePath('file1.yml');
  const fileYAML = getFixturePath('file3.yaml');

  const [dataJSON, extJSON] = getFileData(fileJSON);
  const [dataYML, extYML] = getFileData(fileYML);
  const [dataYAML, extYAML] = getFileData(fileYAML);

  expect(parsers(dataJSON, extJSON)).toEqual(JSON.parse(dataJSON));
  expect(parsers(dataYML, extYML)).toEqual(yaml.load(dataYML));
  expect(parsers(dataYAML, extYAML)).toEqual(yaml.load(dataYAML));
});

test('IncorrectParser', () => {
  const fileTXT = getFixturePath('file3.txt');
  const [dataTXT, extTXT] = getFileData(fileTXT);

  expect(parsers(dataTXT, extTXT)).toBeFalsy();
});
