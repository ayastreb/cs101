const test = require('tape')
const Queue = require('../DataStructures/Queue')
/**
 * Given an input string we need to check if all parentheses are balanced (closed).
 *
 * Performance: O(n)
 * @param {String} input
 * @return {Boolean|Number} true if parentheses are balanced, position of first
 * offender otherwise.
 */
function checkParentheses(input) {
  const OPEN = '('
  const CLOSED = ')'
  const queue = new Queue()

  const parentheses = input.split('')
  for (let position = 0; position < parentheses.length; position++) {
    if (parentheses[position] === OPEN) {
      queue.enqueue(position)
    } else if (parentheses[position] === CLOSED) {
      if (queue.length === 0) return position
      queue.dequeue()
    }
  }

  return queue.length === 0 ? true : queue.dequeue()
}

test('it returns true for balanced input', assert => {
  assert.equal(checkParentheses('(())'), true)
  assert.equal(checkParentheses('((())())()'), true)
  assert.equal(checkParentheses('(a + b) + ((2 * 3) + 5)'), true)
  assert.equal(checkParentheses('2 + 2'), true)
  assert.end()
})

test('it returns position of first offender for unbalanced input', assert => {
  assert.equal(checkParentheses(')()'), 0)
  assert.equal(checkParentheses('())'), 2)
  assert.equal(checkParentheses('(())(()('), 5)
  assert.equal(checkParentheses('(a + b) / ((2 * 3)'), 11)
  assert.equal()
  assert.end()
})
