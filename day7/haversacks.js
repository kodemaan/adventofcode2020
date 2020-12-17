const fs = require('fs')


class BagsMap {
  bagsCanHoldMap = new Map()
  bagsCanHoldGold = new Map()

  addLine = (line) => {
    const [ ,firstBag, secondBagsString] = /^(\w+ \w+) bags contain (.*)$/.exec(line)
    if (secondBagsString.includes('no other bags')) {
      return
    }
    const secondBagsIterator = secondBagsString.matchAll(/\d (\w+ \w+) bag/g)
    const secondBags = []
    for (const secondBag of secondBagsIterator) {
      secondBags.push(secondBag[1])
    }
    this.bagsCanHoldMap.set(firstBag, secondBags)
  }

  subObjectsHaveGold (secondBags) {
    let goldCount = 0
    for (let secondBag of secondBags) {
      if (secondBag === 'shiny gold') {
        goldCount += 1
      } else if (this.bagsCanHoldMap.has(secondBag)) {
        goldCount += this.subObjectsHaveGold(this.bagsCanHoldMap.get(secondBag))
      } else {
        goldCount += 0
      }
    }
    return goldCount > 0
  }

  countHowManyGold = () => {
    let goldCount = 0
    for (const bag of this.bagsCanHoldMap) {
      const [ firstBag, secondBags ] = bag
      if (this.subObjectsHaveGold(secondBags)) {
        goldCount++
      }
    }
    return goldCount
  }
}
const boardingPass = () => {
  const file = fs.readFileSync('haversacks.txt', 'utf-8')
  const lines = file.split('\n')
  const bagsMap = new BagsMap()
  for (const line of lines) {
    bagsMap.addLine(line) 
  }
  return bagsMap.countHowManyGold()
}

const goldCount = boardingPass()
console.log({goldCount});