const readline = require('readline').createInterface({
    input: process.stdin
});

let allCity;
let checker = 0;
const coordinates = [];
let distance;
let fromTo;

readline.on('line', (line) => {

  if (checker === 0) {
    allCity = Number(line);
    checker++;
  } else {

    if (allCity > 0) {

      coordinates.push(line.split(' '));
      allCity--;

    } else if (checker === 1) {
      distance = Number(line);
      checker++;
    } else {
      fromTo = line.split(' ');
    }

  }

}).on('close', () => {

  const endPoint = coordinates[Number(fromTo[1]) - 1].slice();
  const startPoint = coordinates.splice(Number(fromTo[0]) - 1, 1);

  function navigator(cityChain) {

    let newlink;

    do {

      newlink = [];

      for (let i = 0; i < cityChain.length; i++) {

        let n = cityChain[i].length;

        for (let j = 0; j < coordinates.length; j++) {

          let xSubtract = Number(coordinates[j][0]) - Number(cityChain[i][n - 1][0]);
          let ySubtract = Number(coordinates[j][1]) - Number(cityChain[i][n - 1][1]);

          if (xSubtract < 0) {
            xSubtract = -xSubtract;
          }
          
          if (ySubtract < 0) {
            ySubtract = -ySubtract;
          }

          if (xSubtract + ySubtract <= distance) {

            let newVersionChian = cityChain[i].slice();
            let newItem = coordinates.splice(j, 1).flat();
            newVersionChian.push(newItem);
            j--;

            if (newItem.join('') === endPoint.join('')) {

              return newVersionChian;

            } else {
              newlink.push(newVersionChian);
            }

          }

        }

      }

      cityChain = newlink;

    } while (newlink.length > 0);

    return false
  }

  let shortWay = navigator([startPoint]);

  if (shortWay) {
    process.stdout.write((shortWay.length - 1).toString());
  } else {
    process.stdout.write('-1');
  }

});
