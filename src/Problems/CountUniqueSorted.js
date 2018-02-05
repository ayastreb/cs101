const test = require('tape')
/**
 * Given a sorted array of numbers, return the number of unique numbers.
 * Example:
 * [1, 3, 3, 5, 6, 7, 7, 7, 15] => 6 (1, 3, 5, 6, 7, 15)
 *
 * We can iterate over array and compare each item with next item.
 *
 * Time complexity: O(n)
 * @param {Array} input
 */
function countUnique(input) {
  if (input.length <= 1) return input.length

  let counter = 1
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] !== input[i + 1]) counter++
  }

  return counter
}

test('it counts zero items', assert => {
  assert.equal(countUnique([]), 0)
  assert.end()
})

test('it counts single item', assert => {
  assert.equal(countUnique([5]), 1)
  assert.end()
})

test('it counts single unique item', assert => {
  assert.equal(countUnique([5, 5, 5]), 1)
  assert.end()
})

test('it counts multiple items', assert => {
  assert.equal(countUnique([1, 3, 3, 5]), 3)
  assert.equal(countUnique([1, 3, 3, 4, 5, 5, 5]), 4)
  assert.end()
})

test('it counts long list of items', assert => {
  const input = []
  const n = 1000
  // generate n^2 input array
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      input.push(i)
    }
  }
  assert.equal(countUnique(input), n)
  assert.end()
})
