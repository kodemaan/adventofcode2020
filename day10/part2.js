const fs = require('fs')

//const file = fs.readFileSync('input.txt', 'utf-8')
//const file = fs.readFileSync('test.txt', 'utf-8')
const file = fs.readFileSync('test1.txt', 'utf-8')
let lines = file.split('\n')
lines = lines.map(item => Number(item))
let sortedLines = lines.sort((a,b) => a - b)
let maxNumber = sortedLines[sortedLines.length - 1] + 3
// Max / my adapter
// with help from https://dev.to/sleeplessbyte/comment/192lf
//
// Example:
// (0) 1 4 5 6 7 10 11 12 15 16 19 (22)
//
// It takes the number of paths from the high number and calculates paths to the lowest number
// ex. there's only one way to 0 so 0 defaults to 1
// 1 - 3 is invalid, 1 - 2 is invalid, 1 - 1 is 0 so 1 path 
// it stays as 1 up until 6 where it's 
// 6 - 3 = 3 (invalid), 6 - 2 = 4 is valid (1) 6 - 1 = 5 is valid (1) so 1 + 1 is 2 valid paths now
// This repeats until the end
//
sortedLines.push(maxNumber)
const parse = () => {
  const totalObj = {0: 1}
  for (let i = 1; i < sortedLines.length; i++) {
    totalObj[sortedLines[i]] = [1,2,3].reduce((total, current) => {
      total += Number(totalObj[sortedLines[i] - current]) || 0 
      return total
    }, 0)
  }
  console.log({ answer: totalObj[maxNumber] });
}

parse()
