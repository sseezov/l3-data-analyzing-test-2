#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

// BEGIN

// Step 1
const rows = content.split('\r\n');
const data = rows.slice(1);

const creatures = data.map((creature) => creature.split('|')[1]);
console.log(`Количество видов существ: ${creatures.length}`);

// Data Normalization
const collection = data.map((row) => row.split('|'));
const normalizedData = collection.map((item) =>
  item.filter((elem) => elem).map((elem) => elem.trim())
);

// Step 2
const strengthOrder = _.sortBy(normalizedData, [1]);
const strongestUnit = strengthOrder[strengthOrder.length - 1];
const secondStrongestUnit = strengthOrder[strengthOrder.length - 2];
const tenStrongest = strongestUnit[6] * 10;
const twentySecondStrongest = secondStrongestUnit[6] * 20;

console.log(`Стоимость найма 10 самых сильных существ: ${tenStrongest}
Стоимость найма 20 вторых по силе существ: ${twentySecondStrongest}`);

// END
