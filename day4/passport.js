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
  requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

  addLineToPassport = (line) => {
    const currentFields = line.split(' ');
    currentFields.reduce((final, field) => {
      const [ id, value ] = field.split(':')

      this.fields[id] = value;
      return final
    }, {})
  }

  isValidPassport = () => {
    const missingFields = []
    this.requiredFields.forEach(key => {
      if (!this.fields[key]) {
        missingFields.push(key)
      }
    });
    // If all fields available then it's valid
    if (missingFields.length === 0) {
      return true;
    }
    // If all fields available but the non-north pole field (cid) then it's valid
    if (missingFields.length === 1 && missingFields[0] === 'cid') {
      return true
    }
  }
}

passportProblem()
