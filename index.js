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
#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), "utf-8");

// BEGIN
function one(content, exp = 1) {
  const test = content.split("\n");
  const result = test.flatMap((n) => {
    if (n.match(/[1-9]/) !== null) {
      return n;
    } else return [];
  });
  if (exp === 1)
    console.log(result.length, "Именно столько видов существ в табличке");
  else {
    return result;
  }
}
one(content);
function two(contеnt, exp = 1) {
  const b = one(content, 0).map((a) => a.trim());
  const spl = b.map((a) => {
    const result = [];
    for (const i of a.split("|")) {
      if (i != "") {
        result.push(i.trim());
      }
    }
    return result;
  });
  const sortbypower = spl.sort((a, b) => b[1] - a[1]);
  if (exp === 1) {
    console.log(sortbypower[1][sortbypower[1].length - 1] * 20, "Number One");
    console.log(sortbypower[0][sortbypower[0].length - 1] * 10, "Number Two");
  } else return spl;
}
two(content);
function three(content) {
  const sortbyweigth = two(content, 0).sort(
    (a, b) => b[b.length - 2] - a[a.length - 2]
  );
  console.log(sortbyweigth[0][3] * sortbyweigth[0][6], "Fat boyy");
  console.log(
    sortbyweigth[sortbyweigth.length - 1][3] *
      sortbyweigth[sortbyweigth.length - 1][6],
    "noFat boyy"
  );
}
three(content);
function four(content) {
  const sortbyprice = two(content, 0)
    .map(([u, p, h, ot, hei, wei, price]) => [u, price / p])
    .sort((a, b) => b[1] - a[1]);
  console.log(sortbyprice[0][0], "Невыгодный");
  console.log(sortbyprice[sortbyprice.length - 1][0], "выгодный");
}
four(content);
function five(content) {
  const arr = two(content, 0)
    .map(([u, p, h, ot, hei, wei, price]) => {
      let priceofot = 0;
      let power = 0;
      while (priceofot < 10000) {
        priceofot += Number(price);
        power += Number(p);
      }
      return [u, priceofot, power];
    })
    .sort((a, b) => b[b.length - 1] - a[a.length - 1]);
  console.log(
    `Самый выгодный отряд из ${arr[0][0]} c ценой в ${arr[0][1]} и количеством силы в ${arr[0][2]}`
  );
}
five(content);
// END

// END