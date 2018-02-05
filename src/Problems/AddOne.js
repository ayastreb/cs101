const test = require('tape')

/**
 * Given an array of digits, representing an integer, add one to it.
 *
 * Example:
 * input: [1, 2, 3] // represents integer 123
 * output: [1, 2, 4]
 *
 * input: [9, 9] // represents integer 99
 * output: [1, 0, 0]
 *
 * @param {Array} input
 * @returns {Array}
 */
function addOne(input) {
  const result = []
  let start = 0
  while (start < input.length && input[start] === 0) start++

  let carry = 1
  for (var i = input.length - 1; i >= start; i--) {
    const sum = input[i] + carry
    result.push(sum % 10)
    carry = sum > 9 ? 1 : 0
  }
  if (carry === 1) result.push(carry)

  return result.reverse()
}

test('it adds one', assert => {
  assert.deepEqual(addOne([9, 9]), [1, 0, 0])
  assert.deepEqual(addOne([1, 9, 9]), [2, 0, 0])
  assert.deepEqual(addOne([1, 2, 3]), [1, 2, 4])
  assert.end()
})

test('ignores leading zeros', assert => {
  assert.deepEqual(addOne([0, 9]), [1, 0])
  assert.deepEqual(addOne([0, 1, 2, 3]), [1, 2, 4])
  assert.end()
})
