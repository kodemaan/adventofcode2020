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
    if (firstBag === 'shiny gold') {
      console.log('hi');
    }
    for (const secondBag of secondBagsIterator) {
      secondBags.push({name: secondBag[2], count: secondBag[1]})
    }
    this.bagsCanHoldMap.set(firstBag, secondBags)
  }

  subObjectsBags (secondBags) {
    let bagCount = 0
    for (let secondBag of secondBags) {
      if (this.bagsCanHoldMap.has(secondBag.name)) {
        bagCount += Number(secondBag.count) + (Number(secondBag.count) * this.subObjectsBags(this.bagsCanHoldMap.get(secondBag.name)))
      } else {
        return secondBag.count
      }
    }
    return bagCount
  }

  countHowManyBags = (bag = null) => {
    const secondBags = this.bagsCanHoldMap.get(bag)
    return this.subObjectsBags(secondBags)
  }
}
const boardingPass = () => {
  const file = fs.readFileSync('haversacks.txt', 'utf-8')
  const lines = file.split('\n')
  const bagsMap = new BagsMap()
  for (const line of lines) {
    bagsMap.addLine(line) 
  }
  return bagsMap.countHowManyBags('shiny gold')
}

const goldCount = boardingPass()
console.log({goldCount});