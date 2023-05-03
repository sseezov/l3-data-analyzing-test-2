import { beforeEach, test, expect } from '@jest/globals';

import { execFileSync } from 'child_process';
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rows1;
let rows2;

beforeEach(() => {
  const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };

  const result1 = execFileSync(
    'bin/poetry.js',
    ['__fixtures__/poetry1.csv'],
    options,
  );
  rows1 = result1.trim().split('\n')

  const result2 = execFileSync(
    'bin/poetry.js',
    ['__fixtures__/poetry2.csv'],
    options,
  );
  rows2 = result2.trim().split('\n')
});

test('step1', () => {
  expect(rows1[0]).toEqual(`Author: Федор Тютчев`)
  expect(rows1[1]).toEqual(`Title: Silentium!`)
  expect(rows1[2]).toEqual(`Year: 1830 г.`)

  expect(rows2[0]).toEqual(`Author: Афанасий Фет`)
  expect(rows2[1]).toEqual(`Title: Я пришел к тебе с приветом…`)
  expect(rows2[2]).toEqual(`Year: 1843 г.`)
});

test('step2', () => {
  expect(rows1[3]).toEqual(`Strophes: 3`)
  expect(rows1[4]).toEqual(`Strings in each strophe: 6`)

  expect(rows2[3]).toEqual(`Strophes: 4`)
  expect(rows2[4]).toEqual(`Strings in each strophe: 4`)
});

test('step3', () => {
  expect(rows1[5]).toEqual('Unions: 7');

  expect(rows2[5]).toEqual('Unions: 5');
});

test('step4', () => {
  expect(rows1[6]).toEqual(`Words: 77`);
  expect(rows1[7]).toEqual(`Signs: 23`);

  expect(rows2[6]).toEqual('Words: 71');
  expect(rows2[7]).toEqual('Signs: 19');
});

test('step5', () => {
  expect(rows1[8]).toEqual('Words percentage: 72.0%');
  expect(rows1[9]).toEqual('Unions percentage: 21.5%');
  expect(rows1[10]).toEqual('Signs percentage: 6.5%');

  expect(rows2[8]).toEqual('Words percentage: 74.7%');
  expect(rows2[9]).toEqual('Unions percentage: 20.0%');
  expect(rows2[10]).toEqual('Signs percentage: 5.3%');
});