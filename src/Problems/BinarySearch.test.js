const test = require('tape')
const search = require('./BinarySearch')

test('return -1 when item not found', assert => {
  assert.equal(search(5, [1, 2, 3]), -1)
  assert.end()
})

test('return index of found item', assert => {
  assert.equal(search(1, [0, 1, 2, 3, 4, 5, 6]), 1)
  assert.equal(search(2, [2, 14, 16, 18, 22, 30, 31, 33]), 0)
  assert.equal(search(16, [2, 14, 16, 18, 22, 30, 31, 33]), 2)
  assert.equal(search(31, [2, 14, 16, 18, 22, 30, 31, 33]), 6)
  assert.equal(search(33, [2, 14, 16, 18, 22, 30, 31, 33]), 7)
  assert.equal(search(-2, [-2, -1, 0, 14, 16, 18, 22, 30]), 0)
  assert.equal(search(-1, [-2, -1, 0, 14, 16, 18, 22, 30]), 1)
  assert.end()
})
