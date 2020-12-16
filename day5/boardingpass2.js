const fs = require('fs')
const {exit} = require('process')

const boardingPass = async () => {
  const file = fs.readFileSync('boardingpass.txt', 'utf-8')
  const lines = file.split('\n')
  const boardingPasses = []
  for (const line of lines) {
    boardingPasses.push(parseBoardingPass(line))
  }
  return boardingPasses
}

const parseBoardingPass = (line) => {
  let boardingPass = {}

  // Find row
  let maxRow = 127
  let minRow = 0
  for (let i = 0; i <= 6; i++) {
    const char = line[i]
    const increment = Math.floor((maxRow + 1 - minRow) / 2)
    if (char === 'F') {
      maxRow = maxRow - increment;
    }
    if (char === 'B') {
      minRow = minRow + increment;
    }
  }
  // Could be minRow or maxRow now since they're both right
  boardingPass['row'] = minRow

  // Find Column
  let minCol = 0
  let maxCol = 7
  for (let i = 7; i <= 9; i++) {
    const char = line[i]
    const increment = Math.floor((maxCol + 1 - minCol) / 2)
    if (char === 'R') {
      minCol = minCol + increment
    }
    if (char === 'L') {
      maxCol = maxCol - increment
    }
  }
  boardingPass['col'] = minCol
  boardingPass['seatId'] = boardingPass['row'] * 8 + boardingPass['col']
  return boardingPass
}

boardingPass().then(data => {
  const planeMap = []
  const highest = data.forEach(value => {
    const { col, row } = value
    if (!planeMap[row]) {
      planeMap[row] = []
    }
    planeMap[row][col] = 'X'
  }, 0)
  // Makes sure the bad rows at the front are ignored
  let hitFirstGood = false
  for (const rowKey in planeMap) {
    const row = planeMap[rowKey]
    if (row === undefined) {
      continue
    }
    let filledSeats = 0;
    let mySeat = null
    for (let seatKey = 0; seatKey < row.length;seatKey++) {
      if (row[seatKey] === 'X') {
        filledSeats++
      } else {
        mySeat = seatKey
      }
    }
    if (filledSeats !== 8 && hitFirstGood === true) {
      console.log({mySeat, myRow: rowKey});
      // Exit once I found my seat
      exit(0)
    }
    if (filledSeats === 8) {
      hitFirstGood = true
    }
  }

})
