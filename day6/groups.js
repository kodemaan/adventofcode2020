const fs = require('fs')
const { exit } = require('process')

const groups = async () => {
  const file = fs.readFileSync('groups.txt', 'utf-8')
  const lines = file.split('\n')
  const groups = []
  let currentSet = new Set()
  for (const line of lines) {
    if (line === '') {
      groups.push(currentSet)
      currentSet = new Set()
      continue
    }
    for (let char of line) {
      currentSet.add(char)
    }
  }
  return groups
}

groups().then(data => {
  console.log(data.reduce((total, current) => total += current.size, 0));
})
