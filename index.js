#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const stringsWithCreatures = content.split('\r\n');
const data = stringsWithCreatures.slice(1).map((string) => string.split('|').slice(1, 8).map(eleme => eleme.trim()))
console.log(`количество существ в таблице ${data.length}`)

const strength = data.map((creature) => creature[1])
const maxStrength = strength.reduce((acc, el) => {
  if (acc < el) {
    acc = el
  }
  return acc;
})
const creatures = data.map((creature) => creature[0])
const price = data.map((row) => row[6])

const maxStrengthIndex = strength.indexOf(String(maxStrength))
const strongestCreature = creatures[maxStrengthIndex]

const strongthSecond = [...strength]
strongthSecond.splice(maxStrengthIndex, 1, 0)
const maxStrengthSecond = strongthSecond.reduce((acc, el) => {
  if (acc < el) {
    acc = el
  }
  return acc;
})
const maxStrengthSecondIndex = strongthSecond.indexOf(maxStrengthSecond)
const strongestSecondCreature = creatures[maxStrengthSecondIndex]

// console.log(strongestCreature)
// console.log(strongestSecondCreature)

console.log(`стоимость найма 10 самых сильных существ: ${Number(price[maxStrengthIndex]) * 10}`)
console.log(`стоимость найма 10 самых сильных существ: ${Number(price[maxStrengthSecondIndex]) * 20}`)


const wegthOfCreatures = data.map((row) => Number(row[5]))
const maxWeight = Math.max(...wegthOfCreatures)
const minWeight = Math.min(...wegthOfCreatures)
const maxWeightIndex = wegthOfCreatures.indexOf(maxWeight)
const minWeightIndex = wegthOfCreatures.indexOf(minWeight)
const squads = data.map(row => row[3])

console.log(`цена за самый толстый отряд: ${squads[maxWeightIndex] * price[maxWeightIndex]}`)
console.log(`цена за самый худых отряд: ${squads[minWeightIndex] * price[minWeightIndex]}`)

// Step 4
const priceFor1Strength = data.map((row) => {
  const index = data.indexOf(row);
  return Math.floor((Number(price[index])) / Number(strength[index]))
})

const bestPrice = Math.min(...priceFor1Strength)
const worstPrice = Math.max(...priceFor1Strength)
const bestPriceCreature = creatures[priceFor1Strength.indexOf(bestPrice)]
const worstPriceCreature = creatures[priceFor1Strength.indexOf(worstPrice)]
const bestPriceForCreature = price[priceFor1Strength.indexOf(bestPrice)]

console.log(`самый выгодный юнит: ${bestPriceCreature}`)
console.log(`самый невыгодный юнит: ${worstPriceCreature}`)

// Step 5
console.log(`самая сильная армия за 10000: ${Math.floor(10000 / bestPriceForCreature)} ${bestPriceCreature}`)
// END