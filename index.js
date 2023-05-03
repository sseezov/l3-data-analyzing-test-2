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

const rows = content.split('\r\n')
const data = rows.slice(1).map((row) => row.split('|').slice(1, 8).map(element => element.trim()))
console.log(`Количество рядов:`, data.length)

const strengths = data.map((row) => row[1])
const creatures = data.map(row => row[0])
const prices = data.map(row => row[6])
const weights = data.map(row => row[5])
const troops = data.map(row => row[3])

const maxStrength = Math.max(...strengths);
const maxWeight = Math.max(...weights);
const minWeight = Math.min(...weights);

const maxStrengthIndex = strengths.indexOf(String(maxStrength));

const strengths2 = strengths.slice(0, maxStrengthIndex).concat(strengths.slice(maxStrengthIndex+1))
const maxStrength2 = Math.max(...strengths2);
const maxStrengthIndex2 = strengths2.indexOf(String(maxStrength2));

console.log(`цена за 10 сильнейших созданий: ${Number(prices[maxStrengthIndex]) * 10}`)
console.log(`цена за 20 вторых по силе созданий: ${Number(prices[maxStrengthIndex2]) * 20}`)

const fatIndex = weights.indexOf(String(maxWeight))
const thinIndex = weights.indexOf(String(minWeight))

console.log(`цена за отряд самых толстых: ${Number(troops[fatIndex]) * Number(prices[fatIndex])} `)
console.log(`цена за отряд самых тонких: ${Number(troops[thinIndex]) * Number(prices[thinIndex])} `)

const priceFor1Strength = data.map((row) => {
  const index = data.indexOf(row)
  return Math.floor(Number(prices[index]) / Number(strengths[index]))
})

const bestPrice = Math.min(...priceFor1Strength)
const worstPrice = Math.max(...priceFor1Strength)
const bestPriceCreature = creatures[priceFor1Strength.indexOf(bestPrice)]
const worstPriceCreature = creatures[priceFor1Strength.indexOf(worstPrice)]

console.log(`Самый выгодный юнит: ${bestPriceCreature}`)
console.log(`Самый невыгодный юнит: ${worstPriceCreature}`)

const quantityOfCheapestCreatures = 10000/bestPrice;
console.log(`Самая лучшая армия за 10000: ${quantityOfCheapestCreatures} ${bestPriceCreature}`)
// END