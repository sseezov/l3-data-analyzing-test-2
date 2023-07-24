export default (content) => {
  const data = content.split('\n').slice(1);
  console.log(`Количество рядов: ${data.length}`)

  const rows = data.map((row) => row
    .split('|')
    .filter((row) => row))
    .map((array) => array
      .map((element) => element.trim())
    );

  const creatures = rows.map((row) => row[0])
  const prices = rows.map((row) => Number(row[6]))

  const strengths = rows.map((row) => Number(row[1]))
  const strongestIndex = strengths.indexOf(Math.max(...strengths))
  const strengthsWithoutStrongest = strengths.slice()
  strengthsWithoutStrongest[strongestIndex] = 0;
  const secondStrongestIndex = strengthsWithoutStrongest.indexOf(Math.max(...strengthsWithoutStrongest));
  console.log(`цена за 10 сильнейших созданий: ${prices[strongestIndex] * 10}`)
  console.log(`цена за 20 вторых по силе созданий: ${prices[secondStrongestIndex] * 20}`)

  const unitsInDivision = rows.map((row) => row[3])
  const averageWeight = rows.map((row) => Number(row[5]));
  const fattestUnitIndex = averageWeight.indexOf(Math.max(...averageWeight))
  const thinnestUnitIndex = averageWeight.indexOf(Math.min(...averageWeight))
  console.log(`цена за отряд самых толстых: ${prices[fattestUnitIndex] * unitsInDivision[fattestUnitIndex]}`)
  console.log(`цена за отряд самых тонких: ${prices[thinnestUnitIndex] * unitsInDivision[thinnestUnitIndex]}`)

  const mapStengthToValue = strengths.map((strength, index) => Math.floor(prices[index] / strength));
  const worstByPriceIndex = mapStengthToValue.indexOf(Math.max(...mapStengthToValue))
  const bestByPriceIndex = mapStengthToValue.indexOf(Math.min(...mapStengthToValue))
  console.log(`Самый выгодный юнит: ${creatures[bestByPriceIndex]}`)
  console.log(`Самый невыгодный юнит: ${creatures[worstByPriceIndex]}`)

  console.log(`Самая лучшая армия за 10000: ${10000/prices[bestByPriceIndex]} ${creatures[bestByPriceIndex]}`)
}