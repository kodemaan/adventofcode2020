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

(async function() {
  const lines = await getFileByLinesIntoArray();
  let goodPasswords = 0;
  let badPasswords = 0;
  for (const line of lines) {
    const [rangeChars, char, password] = line
    const [ min, max ] = rangeChars.split('-')
    const [ charSanitized ] = char.split(':')
    let matches = password.match(new RegExp(charSanitized, "g")) || 0;
    matches = matches.length
    if (matches >= Number(min) && matches <= Number(max)) {
      goodPasswords += 1
    } else {
      badPasswords += 1
    }
  }
  console.log({
    goodPasswords,
    badPasswords
  });
})()
