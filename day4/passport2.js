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

  hasAllKeys = () => {
    return this.requiredFields.every(key => this.fields[key])
  }

  isValidPassport = () => {
    const missingOrInvalid = []
    if (!this.hasAllKeys()) {
      return false
    }
    for (const key in this.fields) {
      const value = this.fields[key]
      // Invalid or falsy value
      if (!value) {
        return false
      }
      switch (key) {
        case 'byr':
          const birthYear = Number(value)
          if (birthYear < 1920 || birthYear > 2002) {
            return false
          }
          break;
        case 'iyr':
          const issueYear = Number(value)
          if (issueYear < 2010 || issueYear > 2020) {
            return false
          }
          break;
        case 'eyr':
          const expireYear = Number(value)
          if (expireYear < 2020 || expireYear > 2030) {
            return false
          }
          break;
        case 'hgt':
          const heightNumber = Number(value.replace(/[^\d]/g, '')) 
          let measure = null 
          if (value.includes('cm')) {
            measure = 'cm'
          } else if (value.includes('in')) {
            measure = 'in'
          }
          if (!measure) {
            return false
          }
          if (measure === 'cm' && (heightNumber < 150 || heightNumber > 193)) {
            return false
          }
          if (measure === 'in' && (heightNumber < 59 || heightNumber > 76)) {
            return false
          }
          break;
        case 'hcl':
          if (!/^#[0-9a-z]{6}$/.test(value)) {
            return false
          }
          break;
        case 'ecl':
          if (!['amb','blu','brn','gry','grn','hzl','oth'].includes(value)) {
            return false;
          }
          break;
        case 'pid':
          if (!/^[0-9]{9}$/.test(value)) {
            return false
          }
      }
    }
    console.log(this.fields['hcl'].length);
    return true
  }
}

passportProblem()
