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

let total = 1
total *= trees(1, 1);
total *= trees(1, 3);
total *= trees(1, 5);
total *= trees(1, 7);
total *= trees(2, 1);
console.log(total);
