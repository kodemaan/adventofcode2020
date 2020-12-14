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
