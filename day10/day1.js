const fs = require('fs')

//const file = fs.readFileSync('input.txt', 'utf-8')
//const file = fs.readFileSync('test.txt', 'utf-8')
const file = fs.readFileSync('test1.txt', 'utf-8')
let lines = file.split('\n')
lines = lines.map(item => Number(item))
let sortedLines = lines.sort((a,b) => a - b)
const parse = (number = 0) => {
  const index = sortedLines.findIndex(number)
  for (let i = index; i < sortedLines.length; i++) {
    const curNumber = 
    if ()
  }
  //console.log({diffOne, diffThree});
  console.log({answer: diffOne.length * diffThree.length})
}

parse(sortedLines[0])
