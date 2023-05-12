#!/usr/bin/env node
import { fileURLToPath } from "node:url";

import path from "node:path";
import fs from 'fs';
import _ from 'lodash'
import { workerData } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  '..',
  fileName
  ), 'utf-8');

// BEGIN
//Step 1 

const data = content.split('\n').map((row) => row.split('|').slice(1, -1)).slice(1);
const names = data.map((row) => row[0]);
console.log(`Количество рядов: ${names.length}`);


// Step 2
const strengthOrder = _.sortBy(data, (creature) =>
  Number(creature[1])
);
const strongestUnit = strengthOrder[strengthOrder.length - 1];
const secondStrongestUnit = strengthOrder[strengthOrder.length - 2];
const tenStrongest = strongestUnit[6] * 10;
const twentySecondStrongest = secondStrongestUnit[6] * 20;

console.log(`цена за 10 сильнейших созданий: ${tenStrongest}
цена за 20 вторых по силе созданий: ${twentySecondStrongest}`);


  //Step 3
  const someWeightUnit = data.sort((a, b) => b[5] - a[5]);
  console.log(`цена за отряд самых толстых: ${someWeightUnit[0][3] * someWeightUnit[0][6]}`);
  console.log(`цена за отряд самых тонких: ${someWeightUnit[someWeightUnit.length - 1][3] * someWeightUnit[someWeightUnit.length - 1][6]}`);
  
  //step 4
  
// END 