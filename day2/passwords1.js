const fs = require('fs');
const readline = require('readline');

const passwords = () => {
  const file = fs.readFileSync('passwords.txt', 'utf-8');
  const lines = file.split(/\n/)
  let goodPasswords = 0;
  let badPasswords = 0;
  for (let oldLine of lines) {
    const line = oldLine.split(' ')
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
}

passwords()
