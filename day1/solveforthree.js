const fs = require('fs');

// Get all lines as a separate array item for easier processing
const solveForThree = () => {
  const file = fs.readFileSync('report.txt', 'utf-8');
  const lines = file.split(/\n/)
  try {
    // For each first number go through all other numbers and determine if the two together = 2020,
    // if not go to the next number and repeat until this matches something
    for (let i = 0;i < lines.length; i++) {
      const mainNumber = Number(lines[i])
      for (let j = 0; j < lines.length; j++) {
        if (i === j) {
          continue;
        }
        const secondNumber = Number(lines[j])
        for (let k = 0; k < lines.length; k++) {
          if (k === i || k === j) {
            continue
          }
          const thirdNumber = Number(lines[k])

          if (mainNumber + secondNumber + thirdNumber === 2020) {
            console.log({ first: mainNumber, second: secondNumber, third: thirdNumber});
            console.log('==== FINISHED =====');

            // Empty return to stop processing
            return
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

solveForThree()
