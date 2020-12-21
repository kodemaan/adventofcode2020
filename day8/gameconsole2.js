const fs = require('fs')

const runAllLines = (parsedLines) => {
  let ranTwice = false
  let currentLine = 0
  let aggregate = 0
  let runLog = []
  const parsedLinesCopy = [...parsedLines]
  while (ranTwice === false) {
    const line = parsedLinesCopy[currentLine]
    // If end of file then fail out
    if (!line) {
      ranTwice = true
      return aggregate
    }
    if (parsedLinesCopy[currentLine].invoked > 0) {
      ranTwice = true
      // Reset previously flipped but acknowledge it was flipped
      return false
    }
    parsedLinesCopy[currentLine].invoked = 1
    runLog.push(currentLine)
    switch (line.method) {
      case 'nop':
        currentLine++
        break
      case 'acc':
        if (line.direction === '-') {
          aggregate -= line.count
        } else {
          aggregate += line.count
        }
        currentLine++
        break
      case 'jmp':
        if (line.direction === '-') {
          currentLine -= line.count
        } else {
          currentLine += line.count
        }
        break;
    }
  }
}
const parse = () => {
   //const file = fs.readFileSync('testeq5.txt', 'utf-8') // Equals 6 for this example
  const file = fs.readFileSync('puzzle.txt', 'utf-8')
  const lines = file.split('\n')
  const parsedLines = []
  for (let i in lines) {
    if (!lines[i]) break
    const regexResults = /^(\w+) ([+-])(\d+)$/.exec(lines[i])
    parsedLines.push({
      method: regexResults[1],
      direction: regexResults[2],
      count: Number(regexResults[3]),
      invoked: 0,
      flipped: false // Set this to true for acc by default so it never flips
    })
  }
  for (let lineKey in parsedLines) {
    const line = parsedLines[lineKey]
    if (['nop', 'jmp'].includes(line.method)) {
      const newCommand = line.method === 'nop' ? 'jmp' : 'nop'
      const newParsedLines = copyParseLines(parsedLines)
      newParsedLines[lineKey].method = newCommand
      const aggregate = runAllLines(newParsedLines)
      if (!aggregate) {
        continue
      } else {
        console.log({aggregate});
        break
      }
    }
  }
}

function copyParseLines(parsedLines) {
  // The sub-objects were still mapping by reference..... hopefully this doesn't cause slowdowns
  return parsedLines.map(item => ({...item}))
}
parse()
