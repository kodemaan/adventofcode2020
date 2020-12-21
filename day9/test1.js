const fs = require('fs')

const parse = () => {
  const file = fs.readFileSync('preamble.txt', 'utf-8')
  const lines = file.split('\n')

  let previousNumbers = []
  for (let i = 0; i < 25; i++) {
    previousNumbers.push(lines[i])
  }
  for (let i = 25; i < lines.length; i++) {
    if (equalsTwoInArray(Number(lines[i]), previousNumbers)) {
      previousNumbers.push(lines[i])
      previousNumbers.shift()
      continue
    } else {
      console.log(`First failed number is ${lines[i]} on line ${i}`);
      break
    }
  }
}

function equalsTwoInArray(number, numbersArray) {
  for (const num1Key in numbersArray) {
    const num1 = Number(numbersArray[num1Key])
    SubNumber:
    for (const num2Key in numbersArray) {
      if (num2Key === num1Key) {
        continue SubNumber
      }
      const num2 = Number(numbersArray[num2Key])
      console.log({num1, num2});
      if (num1 + num2 === number) {
        return true
      }
    }
  }
  return false
}

parse()
