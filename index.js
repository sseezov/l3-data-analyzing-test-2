#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';
import _ from 'lodash';
import findWarrior from "./src/index.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const makeObject = (arr) => {
  return arr.map((el) => {
    return {
      creature: el[0],
      power: el[1],
      health: el[2],
      count: el[3],
      height: el[4],
      weidth: el[5],
      cost: el[6]
    }
  })
}

const getObjectFromData = (data) => {
  const deleteSpaces = data.replaceAll(' ', '').trim();
  const arr = deleteSpaces.split('\n').map((el) => {
    const a = el.split('|');
    return a.filter((e) => e !== '')
  })
  .slice(1)
  return makeObject(arr);
};

//сделал объект из массива для удобства
const workData = getObjectFromData(content);

//Найти сколько всего видов существ в таблице

console.log(`Всего видов существ: ${workData.length}`);

// Найти стоимость 10 сильнейших воинов и 20 вторых по силе
const listOfPower = workData.map((warrior) => warrior.power).sort((a, b) => a-b).reverse();

//данные первых по силе вояк
const powerGreatestWarrior = listOfPower[0];
const greatestWarrior = findWarrior(workData, 'power', powerGreatestWarrior);
const creatureGreatestWarrior = greatestWarrior.creature;
const costForTenGreatestWarrior = greatestWarrior.cost *10;

//данные вторых по силе вояк
const powerSeconsdGreatestWarrior = listOfPower[1];
const secondGreatestWarriors = findWarrior(workData, 'power', powerSeconsdGreatestWarrior);
const creatureSecondGreatestWarrior = secondGreatestWarriors.creature;
const costForTwentySecondGreatestWarrior = secondGreatestWarriors.cost * 20;

console.log(`\n\nСтоимость 10 самых сильных существ - ${creatureGreatestWarrior}ов равна ${costForTenGreatestWarrior};\nСтоимость 20 вторых по силе существ - ${creatureSecondGreatestWarrior}ов равна ${costForTwentySecondGreatestWarrior}`)

//Найдите самый толстый юнит и самый худой. Посчитайте стоимость найма отряда самых толстых и отряда самых худых.
const listOfWeidth = workData.map((el) => el.weidth).sort((a, b) => a-b).reverse();

//Данные жириков
const fatBoyWeidth = listOfWeidth[0];
const fatBoy = findWarrior(workData, 'weidth', fatBoyWeidth);
const costSquadFatBoys = fatBoy.cost * fatBoy.count;
const creatureFatBoys = fatBoy.creature

//Данные скелетиков
const skinnyBoyWeidth = listOfWeidth[listOfWeidth.length - 1];
const skinnyBoy = findWarrior(workData, 'weidth', skinnyBoyWeidth);
const costSquadSkinnyBoys = skinnyBoy.cost * skinnyBoy.count; 
const creatureSkinnyBoys = fatBoy.creature;

console.log(`\n\nОтряд самых толстых - ${creatureFatBoys}ов обойдется в ${costSquadFatBoys}\nОтряд самых худых - ${creatureSkinnyBoys}ов выйдет в ${costSquadSkinnyBoys}`)

//Посчитайте, какой юнит будет самым невыгодным по соотношению цены и силы и самым выгодным
const newObjectOfWarriorsWithProfitabiliry = workData.map((el) => {
  const profitability = el.cost / el.power;
  return { creature: el.creature };
})

const arrOfProfitability = newObjectOfWarriorsWithProfitabiliry.map((el) => el.profitability).sort((a, b) => a-b).reverse();

const profitabilityBoy = findWarrior(newObjectOfWarriorsWithProfitabiliry, 'profitability', arrOfProfitability[arrOfProfitability.length - 1]).creature;
const nonProfitabilityBoy = findWarrior(newObjectOfWarriorsWithProfitabiliry, 'profitability', arrOfProfitability[0]).creature;

console.log(`\n\nCамое выгодное существо по соотношению цена/сила - ${profitabilityBoy}, самое невыгодное - ${nonProfitabilityBoy}`)

//посчитайте, какую самую сильную армию мы можем нанять за 10000
const objectWarriorsWithProfitabilityForSquad = workData.map((el) => {
  return { warrior:el, profitabilityForSquad: el.cost * el.count, powerForSquad: el.count * el.power}
})

const deleteExpensiveWarriors = objectWarriorsWithProfitabilityForSquad.filter((el) => el.profitabilityForSquad < 10000);

const countSquadsForSquad = deleteExpensiveWarriors.map((el) => {
  el.countSquad = Math.floor(10000 / el.profitabilityForSquad);
  el.powerForTen = el.countSquad * el.powerForSquad
  return el
})

const arrPowerArmys = countSquadsForSquad.map((army) => army.powerForTen).sort((a, b) => a-b);
const powerGreatestArmy = arrPowerArmys[arrPowerArmys.length - 1];
const greatestArmy = findWarrior(countSquadsForSquad, 'powerForTen', powerGreatestArmy);
const creatureOfGreatestArmy = greatestArmy.warrior.creature;
const countSquads = greatestArmy.countSquad;

console.log(`\n\nСамую сильную армию мы можем набрать из ${creatureOfGreatestArmy}ов, количество отрядов - ${countSquads}`);

// END