const fs = require('fs');

(async function() {
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
        const subNumber = Number(lines[j])
        if (mainNumber + subNumber === 2020) {
          console.log({ main: mainNumber, other: subNumber});
          console.log('==== FINISHED =====');

          // Empty return to stop processing
          return
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
})()
