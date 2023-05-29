#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const fileName = process.argv[2];
const fileName = "table.csv";
const content = fs.readFileSync(path.join(__dirname, fileName), "utf-8");

// BEGIN
const data = content.split("\r\n").slice(1);
const dataRec = data.map((item) => {
  const itemaArray = item.split("|");
  return itemaArray.slice(1, -1);
});
const dataRec1 = data.map((item) => {
  const itemaArray = item.split("|");
  const result = itemaArray.slice(1, -1);
  const res1 = result.map((subIt, index) => {
    return index === 0 ? subIt.slice(1, -1) : Number(subIt.slice(1, -1));
  });
  return res1;
});
//console.log(dataRec1);

//TASK1
const animalsType = [];
dataRec.map((item) => {
  if (!animalsType.includes(item[0])) {
    animalsType.push(item[0]);
  }
});

console.log(animalsType.length);

//TASK2

const sortedData = dataRec;
sortedData.sort((a, b) => {
  const num1 = Number(a[1].slice(1, -1));
  const num2 = Number(b[1].slice(1, -1));
  return num1 > num2 ? -1 : 1;
});

const maxPrice = Number(sortedData[0][6].slice(1, -1));
const secondPrice = Number(sortedData[1][6].slice(1, -1));

console.log(
  `price for 10 most powerful soldires ${
    maxPrice * 10
  } rubles, prise for 20 second power soldires ${secondPrice * 20} rubles`
);

//TASK 3

const thikPrice = dataRec1.map((item) => {
  const thikness = item[5] / item[4];
  const priceFraht = item[6] * item[3];

  return { thiknes: thikness, price: priceFraht };
});

thikPrice.sort((a, b) => {
  return a.thiknes >= b.thiknes ? -1 : 1;
});
console.log(
  `Fat units are ${thikPrice[0].thiknes} price ${
    thikPrice[0].price
  }, thin units are ${thikPrice[thikPrice.length - 1].thiknes} price ${
    thikPrice[thikPrice.length - 1].price
  }`
);


// TASK4
const benefit = dataRec1.map((item) => {
  const benefit = item[1] / item[6];
  const unitName = item[0];

  return { benefit: benefit, unit: unitName };
});

benefit.sort((a,b) => {
  return a.benefit >= b.benefit ? -1 : 1;
});

console.log(`The best unit is ${benefit[0].unit}, the wast unit is ${benefit[benefit.length -1].unit}`);

//TASK5

//const task3Result = thikPrice.reduce((acc, item) => {
//  return item.thiknes <= acc.thiknes ? acc.price = item.price: acc
//})
// END
