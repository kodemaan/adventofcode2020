const fs = require('fs')

const parse = () => {
  //const file = fs.readFileSync('testeq5.txt', 'utf-8')
  const file = fs.readFileSync('puzzle.txt', 'utf-8')
  const lines = file.split('\n')
  const parsedLines = []
  for (let i in lines) {
    if (!lines[i]) break
    const regexResults = /^(\w+) ([+-])(\d+)$/.exec(lines[i])
    parsedLines.push({method: regexResults[1], direction: regexResults[2],  count: Number(regexResults[3]), invoked: 0})
  }
  let runCounts = []
  let ranTwice = false
  let currentLine = 0
  let aggregate = 0
  while (ranTwice === false) {
    const line = parsedLines[currentLine]
    // If end of file then fail out
    if (!line) {
      ranTwice = true
      return
    }
    if (runCounts[currentLine]) {
      ranTwice = true
      console.log(`The aggregate is "${aggregate}"`)
      return
    }
    runCounts[currentLine] = 1
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
parse()
