const readline = require('readline').createInterface({
    input: process.stdin
});

let numberOfParenthesis;
let startCombination = [];
let str = '';

/**
 * 1. Принимаем строку, содержащую число, и, изменив тип данных на числовой,
 * помещаем в переменную.
 * 2. Используем инициализированную переменную, как больший член неравенства,
 * которое является условием выполнения цикла. Формируем стартовую комбинацию
 * скобок по принципу: одна единица - две скобки, '(' и ')'.
 */

readline.on('line', (line) => {

  numberOfParenthesis = Number(line);

  if (numberOfParenthesis > 0) {

    for (let i = 1; i <= numberOfParenthesis; i++) {
      startCombination.unshift('(');
      startCombination.push(')');
    }

  } else {
    process.stdout.write(str);
  }

}).on('close', () => {

  /**
  * Передаём переменной str первую комбинацию скобок, как первую строку в
  * лексикографическом порядке.
  */

  str += startCombination.join('') + '\n';

  if (numberOfParenthesis < 2) {
    process.stdout.write(str);
  } else {

    /**
    * Вводим переменную surplus, которая будет содержать "избыток" скобок
    * при рекомбинациях с перестановкой скобок более глубокого уровня (если
    * провести аналогию между комбинацией скобок и двоичным числом, где
    * '(' представляет собой '1', а ')' - есть '0', тогда уровень можно
    * рассматривать, как разряд числа).
    */

    let surplus = 0;

    /**
     * Мы ищем открывающие скобки с права на лево, учитывая тот факт, что
     * крайние левая и правая скобки имеют во всех комбинациях лишь одно
     * состояние (последовательность не может начинаться с закрывающей скобки
     * или заканчиваться открывающей), отправной точкой цикла будет второй
     * элемент справа (другими словами элемент с индексом (n - 2)).
     */

    for (let i = startCombination.length - 2; i > 0; i--) {

      /**
       * Найдя элемент '(', мы сразу заменяем его на ')', так как это
       * фундаментальный шаг нашего цикла, дальнейшее выполнение цикла будет
       * зависеть от условий, основанных на результате этого шага.
       */

      if (startCombination[i] === '(') {

        startCombination[i] = ')';

        if (i !== startCombination.length - (2 + surplus)) {

          /**
           * Если рассматриваемый элемент НЕ является вторым справа (другими
           * словами не имеет индексом значение (n - 2)), тогда заменяем
           * элемент справа (i + 1) от рассматриваемого на ')', таким образом
           * мы завершаем выполнение перестановки скобок. В противном случае,
           * если бы мы рассматривали второй элемент справа, перестновка привела
           * бы нас к тому, что последний элмент (первый справа) получил
           * значение '(', что противоречит правилу, озвученному ранее: крайняя
           * скобка справа ВСЕГДА закрывающая. Также стоит обратить внимание на
           * то, что мы учитываем "избыток", так как он прибавляется к
           * открывающей скобке после перестановки (избыток всегда имеет меньший
           * разряд, нежели открывающая скобка).
           */

          startCombination[i + 1] = '(';

          let miss;

          if (surplus > 0 ) {

            /**
             * Если избыток НЕ равен нулю, при этом избыток МЕНЬШЕ, чем общее
             * количество скобок между переставленной скобкой и крайней скобкой
             * справа, мы прибавляем его к переставленной скобке. Если же
             * избыток больше доступных позиций (общего количества скобок), а
             * значит, прибавив избыток, мы изменим крайнюю скобку на '(', что
             * противоречит правилу, тогда мы отменяем перестановку, увеличиваем
             * избыток и двигаемся по последовательности дальше в поисках
             * следующей перестановки, которая позволит нам добавить избыток,
             * не нарушая при этом ранее установленных правил.
             */

            if (surplus <= (startCombination.length - 1 - (i + 2)) / 2) {

              while (surplus > 0) {

                startCombination[i + 1 + surplus] = '(';
                surplus--;
              }

            } else {
              startCombination[i + 1] = ')';
              surplus++;

              /**
               * Переменная miss позволяет на зафиксировать отмену перестановки
               * и пропустить данную комбинацию, так как она не является
               * валидной, потому что часть скобок мы как бы держим в уме.
               */
              miss = 1;
            }

          }

          /**
           * Возвращаем цикл в стартовую позицию, с которой мы начинаем отсчёт,
           * startCombination.length - 1 с учётом того, что в шапке цикла мы
           * имеем декремент i--.
           */

          i = startCombination.length - 1;

          if (!miss) {
            str += startCombination.join('') + '\n';
          }

        } else {
          surplus++;
        }

      }

    }
    process.stdout.write(str);
  }

});