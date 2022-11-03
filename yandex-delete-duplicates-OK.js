const readline = require('readline').createInterface({
    input: process.stdin
});

let checker = 0;
const uniqueChars = [];

readline.on('line', (line) => {

  if (checker === 0) {
    checker++;
  } else {

    let duplicate = true;

    let highLimit = uniqueChars.length - 1;
    let lowLimit = 0;
    let i = Math.floor(highLimit/2);

    while (lowLimit <= highLimit) {

      if (uniqueChars[i] === line) {
        duplicate = false;
        break;
      } else if (Number(uniqueChars[i]) > Number(line)) {
        highLimit = i - 1;
        i = highLimit - Math.floor((highLimit - lowLimit)/2);
      } else if (Number(uniqueChars[i]) < Number(line)) {
        lowLimit = i + 1;
        i = lowLimit + Math.floor((highLimit - lowLimit)/2);
      }

    }

    if (duplicate) {
      uniqueChars.push(line);
    }
  }

}).on('close', () => {
    process.stdout.write(uniqueChars.join('\n'));
});
