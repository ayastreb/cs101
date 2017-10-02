const test = require('tape')
const search = require('./BinarySearchInRotated')

test('return -1 when item not found', assert => {
  assert.equal(search(5, [1, 2, 3]), -1)
  assert.equal(search(10, [1, 2, 3, 4]), -1)
  assert.end()
})

test('return index of found item', assert => {
  assert.equal(search(1, [3, 1]), 1)
  assert.equal(search(1, [5, 6, 0, 1, 2, 3, 4]), 3)
  assert.equal(search(2, [5, 6, 0, 1, 2, 3, 4]), 4)
  assert.equal(search(4, [5, 6, 0, 1, 2, 3, 4]), 6)
  assert.equal(search(5, [5, 6, 0, 1, 2, 3, 4]), 0)
  assert.equal(search(5, [0, 1, 2, 3, 4, 5, 6]), 5)
  assert.equal(search(5, [4, 5, 6, -2, -1, 0, 3]), 1)
  assert.equal(search(-1, [4, 5, 6, -2, -1, 0, 3]), 4)
  assert.equal(search(2, [16, 18, 22, 30, 31, 33, 2, 14]), 6)
  assert.equal(search(30, [22, 30, 31, 33, 2, 14, 16, 18]), 1)
  assert.end()
})
