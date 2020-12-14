const fs = require('fs');
const readline = require('readline');

// Get all lines as a separate array item for easier processing
async function getFileByLinesIntoArray() {
  const lines = [];
  const fileStream = fs.createReadStream('report.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lines.push(line)
  }
  return lines
}

(async function() {
  const lines = await getFileByLinesIntoArray();
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
})()
