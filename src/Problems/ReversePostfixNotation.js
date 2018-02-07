const test = require('tape')
const Stack = require('../DataStructures/Stack')
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
function calculate(input) {
  validate(input)

  const stack = new Stack()
  const operator = new Map([
    ['+', (right, left) => left + right],
    ['-', (right, left) => left - right],
    ['*', (right, left) => left * right],
    ['/', (right, left) => left / right],
    ['^', (right, left) => Math.pow(left, right)]
  ])

  for (let token of input.split(' ')) {
    if (operator.has(token)) {
      if (stack.length < 2) throw new TypeError('Too few values!')

      const result = operator.get(token)(stack.pop(), stack.pop())
      stack.push(result)
    } else {
      stack.push(parseFloat(token))
    }
  }

  if (stack.length > 1) throw new TypeError('Too many values!')

  return stack.pop()

  /**
   * Only allow digits, spaces and operator symbols.
   * Throw error if something else if found in given input.
   *
   * @param {String} input
   */
  function validate(input) {
    if (!/^[0-9+\-/*^\s.]+$/.test(input)) {
      throw new TypeError('Invalid input!')
    }
  }
}

test('it validates input', assert => {
  assert.throws(() => calculate('1 a 2 +'), TypeError)
  assert.throws(() => calculate('ab+'), TypeError)
  assert.throws(() => calculate('12:'), TypeError)
  assert.throws(() => calculate('foo'), TypeError)
  assert.throws(() => calculate(), TypeError)
  assert.throws(() => calculate(false), TypeError)
  assert.throws(() => calculate([1, 2]), TypeError)
  assert.throws(() => calculate({ a: 1, b: 2 }), TypeError)
  assert.end()
})

test('it validates too many values in input', assert => {
  assert.throws(() => calculate('3 4 5 +'), TypeError)
  assert.end()
})

test('it validates too few values in input', assert => {
  assert.throws(() => calculate('3 +'), TypeError)
  assert.throws(() => calculate('3 4 + -'), TypeError)
  assert.end()
})

test('it calculates addition', assert => {
  assert.equal(calculate('3 4 +'), 7)
  assert.equal(calculate('3.75 4.1 +'), 7.85)
  assert.equal(calculate('3 4.18 +'), 7.18)
  assert.end()
})

test('it calculates subtraction', assert => {
  assert.equal(calculate('5 2 -'), 3)
  assert.equal(calculate('5 1.99 -'), 3.01)
  assert.end()
})

test('it calculates multiplication', assert => {
  assert.equal(calculate('2 3 *'), 6)
  assert.equal(calculate('2 1.5 *'), 3)
  assert.end()
})

test('it calculates division', assert => {
  assert.equal(calculate('6 2 /'), 3)
  assert.equal(calculate('5 2 /'), 2.5)
  assert.end()
})

test('it calculates exponentiation', assert => {
  assert.equal(calculate('2 3 ^'), 8)
  assert.equal(calculate('2 5 ^'), 32)
  assert.end()
})

test('it calculates long expression', assert => {
  assert.equal(calculate('1 2 + 3 *'), 9)
  assert.equal(calculate('1 2 + 3 * 6 +'), 15)
  assert.equal(calculate('1 2 + 3 * 6 + 3 /'), 5) // ((1 + 2) * 3 + 6) / 3
  assert.equal(calculate('5 1 2 + 4 * + 3 -'), 14) // 5 + ((1 + 2) × 4) − 3
  assert.equal(calculate('1 2 3 4 * * *'), 24) // 1 * 2 * 3 * 4
  assert.end()
})
