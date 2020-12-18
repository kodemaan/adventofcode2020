const fs = require('fs')
const {exit} = require('process')


class BagsMap {
  bagsCanHoldMap = new Map()
  bagsCanHoldGold = new Map()

  addLine = (line) => {
    const [ ,firstBag, secondBagsString] = /^(\w+ \w+) bags contain (.*)$/.exec(line)
    if (secondBagsString.includes('no other bags')) {
      return
    }
    const secondBagsIterator = secondBagsString.matchAll(/(\d) (\w+ \w+) bag/g)
    const secondBags = []
    for (const secondBag of secondBagsIterator) {
      secondBags.push({name: secondBag[2], count: Number(secondBag[1])})
    }
    this.bagsCanHoldMap.set(firstBag, secondBags)
  }

  countHowManyBags = (bag = null) => {
    let count = 1
    const secondBags = this.bagsCanHoldMap.get(bag)
    if (!secondBags) {
      return 1
    }
    for (let secondBag of secondBags) {
      const qty = secondBag.count
      count += qty * this.countHowManyBags(secondBag.name)
    }
    return count;
  }
}
const boardingPass = () => {
  const file = fs.readFileSync('haversacks.txt', 'utf-8')
  const lines = file.split('\n')
  const bagsMap = new BagsMap()
  for (const line of lines) {
    bagsMap.addLine(line) 
  }
  // of by one error
  return bagsMap.countHowManyBags('shiny gold') - 1
}

const goldCount = boardingPass()
console.log({goldCount});