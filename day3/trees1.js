const fs = require('fs');

const trees = (down, right) => {
  const file = fs.readFileSync('trees.txt', 'utf-8');
  const lines = file.split(/\n/)
  let column = 0
  let trees = 0
  for (let i = 0; i < lines.length; i += down) {
    const line = lines[i]
    if (line[column % line.length] === '#') {
      trees++
    }
    column += right 
  }
  return trees
}

console.log(trees(1, 3));
