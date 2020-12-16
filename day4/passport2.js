const fs = require('fs')

const passportProblem = async () => {
  const file = fs.readFileSync('passports.txt', 'utf-8');
  const lines = file.split(/\n/)
  let validPassports = 0
  let currentPassport = new Passport() 
  for (const line of lines) {
    if (line === '') {
      if (currentPassport.isValidPassport()) {
        validPassports++
      }
      currentPassport = new Passport()
      continue
    }
    currentPassport.addLineToPassport(line)
  }
  console.log({validPassports});
}
class Passport {
  fields = {}
  requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  addLineToPassport = (line) => {
    const currentFields = line.split(' ');
    currentFields.reduce((final, field) => {
      const [ id, value ] = field.split(':')

      this.fields[id] = value;
      return final
    }, {})
  }

  isValidPassport = () => {
    const missingOrInvalid = []
    this.requiredFields.forEach(key => {
      switch (key) {
        case 'byr':
          const birthYear = Number(this.fields[key])
          if (birthYear >= 1920 && birthYear <= 2002) {
            return
          }
          missingOrInvalid.push(key)
          break;
        case 'iyr':
          const issueYear = Number(this.fields[key])
          if (issueYear < 2010 && issueYear > 2020) {
            missingOrInvalid.push(key)
            return
          }
          break;
        case 'hgt':
          const heightNumber = Number(this.fields[key].replace(/[^\d]/g, '')) 
          let measure = null 
          if (this.fields[key].includes('cm')) {
            measure = 'cm'
          } else if (this.fields[key].includes('in')) {
            measure = 'in'
          }
          if (!measure) {
            missingOrInvalid.push(key)
            return
          }
          if (measure === 'cm' && (heightNumber < 150 || heightNumber > 193)) {
            missingOrInvalid.push(key)
            return
          }
          if (measure === 'in' && (heightNumber < 59 || heightNumber > 76)) {
            missingOrInvalid.push(key)
            return
          }
          break;
        case 'hcl':
          if (!this.fields[key].test(/^#[0-9a-z]{6}/)) {
            missingOrInvalid.push(key)
          }
          break;
        case 'ecl':
          if (!['amb','blu','brn','gry','grn','hzl','oth'].includes(this.fields[key])) {
            missingOrInvalid.push(key)
          }
          break;
      }
    });
    // If all fields available then it's valid
    if (missingOrInvalid.length === 0) {
      return true;
    }
    // If all fields available but the non-north pole field (cid) then it's valid
    if (missingOrInvalid.length === 1 && missingOrInvalid[0] === 'cid') {
      return true
    }
    return false
  }
}

passportProblem()
