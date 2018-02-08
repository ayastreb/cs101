const test = require('tape')

/**
 * Given an array arr of distinct integers and a nonnegative integer k,
 * write a function that returns an array of all pairs [x,y],
 * such that x - y = k. If no such pairs exist, return an empty array.
 *
 * Examples:
 *
 * input = [0, -1, -2, 2, 1], k = 1
 * output: [[0, -1], [-1, -2], [2, 1], [1, 0]]
 *
 * input = [1, 7, 5, 3, 32, 17, 12], k = 17
 * output: []
 *
 * @param {Array} input
 * @param {Number} k
 * @returns {Array}
 */
function findPairsWithDistance(input, k) {
  input.sort((a, b) => a - b)

  const result = []
  let first = 0
  let last = 1
  while (first < input.length && last < input.length) {
    const diff = input[last] - input[first]
    if (diff === k) {
      result.push([input[last], input[first]])
      first++
      last++
    } else if (diff < k) {
      last++
    } else {
      first++
    }
  }

  return result
}

test('Test Case #1', assert => {
  assert.deepEqual(findPairsWithDistance([4, 1], 3), [[4, 1]])
  assert.end()
})

test('Test Case #2', assert => {
  assert.deepEqual(findPairsWithDistance([1, 5, 11, 7], 4), [[5, 1], [11, 7]])
  assert.end()
})

test('Test Case #3', assert => {
  assert.deepEqual(findPairsWithDistance([1, 5, 11, 7], 6), [[7, 1], [11, 5]])
  assert.end()
})

test('Test Case #4', assert => {
  assert.deepEqual(findPairsWithDistance([1, 5, 11, 7], 10), [[11, 1]])
  assert.end()
})

test('Test Case #5', assert => {
  assert.deepEqual(findPairsWithDistance([0, -1, -2, 2, 1], 1), [
    [-1, -2],
    [0, -1],
    [1, 0],
    [2, 1]
  ])
  assert.end()
})

test('Test Case #6', assert => {
  assert.deepEqual(findPairsWithDistance([1, 7, 5, 3, 32, 17, 12], 17), [])
  assert.end()
})
