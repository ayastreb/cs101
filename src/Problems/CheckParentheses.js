const Queue = require('../DataStructures/Queue')
/**
 * Given an input string we need to check if all parentheses are balanced (closed).
 *
 * Performance: O(n)
 * @param {string} input
 * @return {boolean|number} true if parentheses are balanced, position of first
 * offender otherwise.
 */
module.exports = input => {
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
