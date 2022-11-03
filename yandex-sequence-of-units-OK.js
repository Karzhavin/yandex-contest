const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const array = lines.slice();
    const memory = [0];
    let index = 0;
    for (let i = 1; i < array.length; i++) {
    	if (array[i] == 1) {
        	memory[index]++;
        } else if (memory[index] !== 0) {
        	index++;
        	memory[index] = 0;
        }
    }
    let combo = 0;
    for (let i = 0; i < memory.length; i++) {
    	if (memory[i] > combo) {
        	combo = memory[i];
        }
    }
    process.stdout.write(combo.toString());
});
