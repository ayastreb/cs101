const createStack = require('../DataStructures/Stack')
/**
 * Reverse Postfix Notation, also known as Reverse Polish Notation,
 * is a mathematical notation in which every operator follows all of its operands.
 * It does not need any parentheses as long as each operator has a fixed number of operands.
 * The description "Polish" refers to the nationality of logician Jan Łukasiewicz,
 * who invented Polish notation in the 1920s.
 * Postfix notation is much easier to evaluate by computers, since it does not
 * need to parse parentheses to determine order of operators and can use
 * simple stack to perform all calculations.
 *
 * For example infix expression `((1 + 2) * 3 + 6) / 3`
 * can be written in postfix as `1 2 + 3 * 6 + 3 /`
 *
 * @param {String} input
 * @returns {Number}
 */
module.exports = input => {
  validate(input)

  const stack = createStack()
  const processors = {
    '+': (right, left) => left + right,
    '-': (right, left) => left - right,
    '*': (right, left) => left * right,
    '/': (right, left) => left / right,
    '^': (right, left) => Math.pow(left, right)
  }

  for (let token of input.split(' ')) {
    if (processors.hasOwnProperty(token)) {
      if (stack.size() < 2) throw new TypeError('Too few values!')

      stack.push(processors[token](stack.pop(), stack.pop()))
    } else {
      stack.push(parseFloat(token))
    }
  }

  if (stack.size() > 1) throw new TypeError('Too many values!')

  return stack.pop()

  /**
   * Only allow digits, spaces and operator symbols.
   * Throw error if something else if found in given input.
   *
   * @param {String} input
   */
  function validate (input) {
    if (!/^[0-9+\-\/*^\s.]+$/.test(input)) {
      throw new TypeError('Invalid input!')
    }
  }
}
