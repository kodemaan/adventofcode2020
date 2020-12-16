const fs = require('fs');
const readline = require('readline');

// Get all lines as a separate array item for easier processing
async function getFileByLinesIntoArray() {
  const lines = [];
  const fileStream = fs.createReadStream('passwords.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lines.push(line.split(' '))
  }
  return lines
}

const password = () => {
  const file = fs.readFileSync('passwords.txt', 'utf-8');
  const lines = file.split(/\n/)
  let goodPasswords = 0;
  let badPasswords = 0;
  for (const oldLine of lines) {
    const line = oldLine.split(' ')
    const [rangeChars, char, password] = line
    const [ min, max ] = rangeChars.split('-')
    const [ charSanitized ] = char.split(':')
    const [ firstChar, secondChar ] = [password[Number(min) - 1], password[Number(max) - 1]]
    // Matches but both are equal
    if (firstChar === charSanitized && firstChar === secondChar) {
      badPasswords += 1
      continue
    }
    if (firstChar === charSanitized || secondChar === charSanitized) {
      goodPasswords += 1
      continue
    }
    badPasswords += 1
  }
  console.log({
    goodPasswords,
    badPasswords
  });
}

password()
