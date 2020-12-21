const fs = require('fs')

//const file = fs.readFileSync('input.txt', 'utf-8')
//const file = fs.readFileSync('test.txt', 'utf-8')
const file = fs.readFileSync('test1.txt', 'utf-8')
let lines = file.split('\n')
lines = lines.map(item => Number(item))
let sortedLines = lines.sort((a,b) => a - b)
const parse = () => {
  const index = sortedLines.findIndex(number)
  const totalObj = {}
  for (let i = index; i < sortedLines.length; i++) {
    const num = sortedLines[i]
    totalObj[num] = 0
    if (sortedLines.findIndex(num + 1)) {
      totalObj[num] += 1
    }
    if (sortedLines.findIndex(num + 2)) {
      totalObj[num] += 1
    }
    if (sortedLines.findIndex(num + 3)) {
      totalObj[num] += 1
    }
  }
  const sum = 0
  for (let el in totalObj) {
    sum += Number(totalObj[el])
  }
  console.log({sum});
}

parse()
