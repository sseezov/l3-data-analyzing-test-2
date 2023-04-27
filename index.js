#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

// BEGIN
const rows = content.split('\r\n');
const data = rows.slice(1);

const creatures = data.map((creature) => creature.split('|')[1]);
console.log(`Количество видов существ: ${creatures.length}`);
// END
