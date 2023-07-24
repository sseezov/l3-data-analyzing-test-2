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
    'bin/index.js',
    ['__fixtures__/table1.csv'],
    options,
  );
  rows1 = result1.trim().split('\n')

  const result2 = execFileSync(
    'bin/index.js',
    ['__fixtures__/table2.csv'],
    options,
  );
  rows2 = result2.trim().split('\n')
});

test('step1', () => {
  expect(rows1[0]).toEqual(`Количество рядов: 6`)
  expect(rows2[0]).toEqual(`Количество рядов: 6`)
});

test('step2', () => {
  expect(rows1[1]).toEqual(`цена за 10 сильнейших созданий: 5000`)
  expect(rows1[2]).toEqual(`цена за 20 вторых по силе созданий: 10000`)
  expect(rows2[1]).toEqual(`цена за 10 сильнейших созданий: 7500`)
  expect(rows2[2]).toEqual(`цена за 20 вторых по силе созданий: 40000`)
});

test('step3', () => {
  expect(rows1[3]).toEqual(`цена за отряд самых толстых: 25000`)
  expect(rows1[4]).toEqual(`цена за отряд самых тонких: 5000`)
  expect(rows2[3]).toEqual(`цена за отряд самых толстых: 30000`)
  expect(rows2[4]).toEqual(`цена за отряд самых тонких: 3000`)
});

test('step4', () => {
  expect(rows1[5]).toEqual(`Самый выгодный юнит: Гоблин`)
  expect(rows1[6]).toEqual(`Самый невыгодный юнит: Хоббит`)
  expect(rows2[5]).toEqual(`Самый выгодный юнит: Гоблин`)
  expect(rows2[6]).toEqual(`Самый невыгодный юнит: Хоббит`)
});

test('step5', () => {
  expect(rows1[7]).toEqual(`Самая лучшая армия за 10000: 50 Гоблин`)
  expect(rows2[7]).toEqual(`Самая лучшая армия за 10000: 100 Гоблин`)
});