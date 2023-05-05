#!/usr/bin/env node
import { fileURLToPath } from "node:url";

import path from "node:path";
import fs from 'fs';
import _ from 'lodash'

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
console.log("Количество рядов:", _.uniq(data.map((row) => (row[0].trim())).sort()).length)

//Step 2
   data.sort((a, b) => (b[1] - a[1]));
   console.log(data[0][6] / data[0][3] * 10);
   console.log(data[1][6] / data[1][3] * 20);

//Step 3
   
// END 