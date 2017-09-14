const test = require('tape')
const nextElement = require('./NextGreaterNumber')

test('returns -1 for array with 1 element', assert => {
  assert.deepEqual(nextElement([3]), [-1])
  assert.end()
})

test('returns next greater elements', assert => {
  assert.deepEqual(nextElement([2, 10, 5, 8, 4, 2]), [10, -1, 8, -1, -1, -1])
  assert.deepEqual(nextElement([13, 7, 6, 12]), [-1, 12, 12, -1])
  assert.deepEqual(nextElement([3, 7, 1, 5, 13, 6]), [7, 13, 5, 13, -1, -1])
  assert.deepEqual(nextElement([6, 5, 4, 3, 2]), [-1, -1, -1, -1, -1])
  assert.deepEqual(nextElement([10, 2, 2, 4, 0, 1]), [-1, 4, 4, -1, 1, -1])

  assert.end()
})
