const fs = require('fs')
const { exit } = require('process')

const groups = async () => {
  const file = fs.readFileSync('groups.txt', 'utf-8')
  const lines = file.split('\n')
  const groups = []
  let people = []
  for (const line of lines) {
    if (line === '') {
      let returnGroup = null
      for (const person of people) {
        if (returnGroup === null) {
          returnGroup = new Set([...person])
          continue
        }
        returnGroup = new Set([...returnGroup].filter(x => person.has(x)))
      }
      groups.push(returnGroup)
      people = []
      continue
    }
    let currentSet = new Set()
    for (let char of line) {
      currentSet.add(char)
    }
    people.push(currentSet)
  }
  return groups
}

groups().then(data => {
  console.log(data.reduce((total, current) => total += current.size, 0));
})
