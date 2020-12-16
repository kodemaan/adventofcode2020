// Get all lines as a separate array item for easier processing
export const getFileByLinesIntoArray = async (file) => {
  const lines = [];
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lines.push(line.split(split))
    lines.push()
  }
  return lines
}
