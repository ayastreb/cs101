const test = require('tape')
const search = require('./BinarySearchNext')

test('it returns -1 if no haystack given', assert => {
  assert.equal(search(5, undefined), -1)
  assert.equal(search(5, null), -1)
  assert.equal(search(5, false), -1)
  assert.equal(search(5, []), -1)
  assert.end()
})

test('it returns -1 if there are no greater element', assert => {
  assert.equal(search(9, [1, 3, 4, 7, 9]), -1)
  assert.equal(search(10, [1, 3, 4, 7, 9]), -1)
  assert.end()
})

test('it finds next value greater than query', assert => {
  assert.equal(search(0, [2, 14, 16, 20, 22, 30]), 2)
  assert.equal(search(1, [2, 14, 16, 20, 22, 30]), 2)
  assert.equal(search(2, [2, 14, 16, 20, 22, 30]), 14)
  assert.equal(search(5, [2, 14, 16, 20, 22, 30]), 14)
  assert.equal(search(18, [2, 14, 16, 20, 22, 30]), 20)
  assert.equal(search(20, [2, 14, 16, 20, 22, 30]), 22)
  assert.equal(search(22, [2, 14, 16, 20, 22, 30]), 30)
  assert.equal(search(23, [2, 14, 16, 20, 22, 30]), 30)
  assert.equal(search(21, [2, 14, 16, 20, 22]), 22)
  assert.end()
})
