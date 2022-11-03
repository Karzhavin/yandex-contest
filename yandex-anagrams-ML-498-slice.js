const readline = require('readline').createInterface({
    input: process.stdin
});

const lines = [];

readline.on('line', (line) => {

  lines.push(line.split(''));

}).on('close', () => {

  if (lines[0].length === lines[1].length) {

    if (lines[0].length > 1) {

      lines[0] = sort(lines[0]);
      lines[1] = sort(lines[1]);

      /**
       * Используем сортировку слиянием для преобразования массивов к общему
       * виду. Для передачи подмассивов в merge используем метод slice, таким
       * образом каждый повторный рекурсивный вызов НЕ изменяет переданную
       * версию подмассива.
       */

      function sort(array) {

        if (array.length === 1) {
          return array
        } else {
          let middle = Math.floor(array.length / 2);
          return merge(sort(array.slice(0, middle)), sort(array.slice(middle)))
        }
      }

      function merge(firstArr, secondArr) {

        let counter = firstArr.length + secondArr.length;

        const sortedArray = [];

        let firstIndex = 0;
        let secondIndex = 0;

        for (let i = 0; i < counter; i++) {

          if (firstArr[firstIndex] && secondArr[secondIndex]) {

            if (firstArr[firstIndex].charCodeAt() <= secondArr[secondIndex].charCodeAt()) {

              sortedArray.push(firstArr[firstIndex]);
              firstIndex++;
            } else {
              sortedArray.push(secondArr[secondIndex]);
              secondIndex++;
            }

          } else if (firstArr[firstIndex]) {
            sortedArray.push(firstArr[firstIndex]);
            firstIndex++;
          } else {
            sortedArray.push(secondArr[secondIndex]);
            secondIndex++;
          }

        }
        return sortedArray
      }

      if (lines[0].join('') === lines[1].join('')) {
        process.stdout.write('1');
      } else {
        process.stdout.write('0');
      }

    } else {

      if (lines[0][0] === lines[1][0]) {
        process.stdout.write('1');
      } else {
        process.stdout.write('0');
      }

    }

  } else {
    process.stdout.write('0');
  }
});
