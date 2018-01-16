const test = require('tape')
const findMaxElements = require('./FindKMaxElements')

test('it should return k max elements from given array', assert => {
  assert.deepEqual(findMaxElements([1, 2, 5, 3, 10, 6, 0, 7], 3), [6, 7, 10])
  assert.deepEqual(findMaxElements([3, 1, 2], 5), [1, 2, 3])
  assert.end()
})
