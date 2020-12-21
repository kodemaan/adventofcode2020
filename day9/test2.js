const {fail} = require('assert')
const fs = require('fs')

const file = fs.readFileSync('preamble.txt', 'utf-8')
const lines = file.split('\n')
const parse = () => {

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
      return Number(lines[i])
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

const checkContiguousSumAtLine = (line, checkedValue) => {
  let total = 0
  const contiguousNumbers = []
  const numbers = []
  for (let i = line; i < lines.length; i++) {
    numbers.push(i)
    if (!lines[i]) {
      total = false
    }
    contiguousNumbers.push(Number(lines[i]))
    total += Number(lines[i])
    if (total > checkedValue) {
      return { status: false, contiguousNumbers }
    }
    if (total === checkedValue) {
      return { status: true, contiguousNumbers }
    }
  }
  return { status: false, contiguousNumbers }
}

const failedNumber = parse()
for (let i = 0; i < lines.length; i++) {
  const { status, contiguousNumbers } = checkContiguousSumAtLine(i, failedNumber)
  if (status) {
    const sortedNumbers = contiguousNumbers.sort();
    console.log(sortedNumbers[0] + sortedNumbers[sortedNumbers.length - 1]);
    break
  }
}

