const test = require('tape')
/**
 * Given an array of integers, return array with next greater number for each
 * element in array. If there is no greater number for an item - return "-1".
 * For example:
 * [2, 10, 5, 8, 4, 2] => [10, -1, 8, -1, -1, -1]
 *
 * @param {Array} input
 * @returns {Array}
 */
function nextGreaterElements(input) {
  const output = new Array(input.length).fill(-1)
  const greater = []
  for (let index = input.length - 1; index >= 0; index--) {
    let current = input[index]
    let next = greater.pop()
    while (greater.length > 0 && next <= current) next = greater.pop()

    if (next > current) {
      output[index] = next
      greater.push(next)
    }
    greater.push(current)
  }

  return output
}

test('returns -1 for array with 1 element', assert => {
  assert.deepEqual(nextGreaterElements([3]), [-1])
  assert.end()
})

test('returns next greater elements', assert => {
  // prettier-ignore
  assert.deepEqual(nextGreaterElements([2, 10, 5, 8, 4, 2]), [10, -1, 8, -1, -1, -1])
  assert.deepEqual(nextGreaterElements([13, 7, 6, 12]), [-1, 12, 12, -1])
  // prettier-ignore
  assert.deepEqual(nextGreaterElements([3, 7, 1, 5, 13, 6]), [7, 13, 5, 13, -1, -1])
  assert.deepEqual(nextGreaterElements([6, 5, 4, 3, 2]), [-1, -1, -1, -1, -1])
  // prettier-ignore
  assert.deepEqual(nextGreaterElements([10, 2, 2, 4, 0, 1]), [-1, 4, 4, -1, 1, -1])
  assert.end()
})
