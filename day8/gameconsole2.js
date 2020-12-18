const fs = require('fs')

const runAllLines = (parsedLines) => {
  let ranTwice = false
  let currentLine = 0
  let aggregate = 0
  let runLog = []
  let previouslyFlipped = false
  let totalRuns = 0
  MainLoop:
  while (ranTwice === false) {
    const line = parsedLines[currentLine]
    // If end of file then fail out
    if (!line) {
      ranTwice = true
      return aggregate
    }
    if (parsedLines[currentLine].invoked > 0) {
      // Reset previously flipped but acknowledge it was flipped
      if (previouslyFlipped) {
        parsedLines[previouslyFlipped].method = parsedLines[previouslyFlipped].method === 'jmp' ? 'nop' : 'jmp'
      }
      RunLog:
      for (let i = 0; i < runLog.length; i++) {
        totalRuns += 1
        const entry = runLog[i]
        const runLine = parsedLines[entry]
        if (runLine.flipped || runLine.method === 'acc') {
          continue RunLog
        }
        previouslyFlipped = entry
        parsedLines[entry] = {
          ...line,
          method: line.method === 'jmp' ? 'nop' : 'jmp',
          flipped: true
        }
        break
      }
      parsedLines = parsedLines.map(line => {line.invoked = false;return line})
      currentLine = 0
      aggregate = 0
      runLog = []
      continue MainLoop
    }
    parsedLines[currentLine].invoked = 1
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
   const file = fs.readFileSync('testeq5.txt', 'utf-8') // Equals 6 for this example
  //const file = fs.readFileSync('puzzle.txt', 'utf-8')
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
  const aggregate = runAllLines(parsedLines)
  console.log({aggregate});
}
parse()
