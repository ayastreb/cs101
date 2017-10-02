const test = require('tape')
const findMin = require('./MinOfRotatedArray')

test('find min valeu of rotated array', assert => {
  assert.equal(findMin([4, 5, 6, 7, 0, 1, 2]), 0)
  assert.equal(findMin([7, 0, 1, 2, 4, 5, 6]), 0)
  assert.equal(findMin([5, 6, 7, 0, 1, 2, 4]), 0)
  assert.equal(findMin([0, 1, 2, 4, 5, 6]), 0)
  assert.equal(findMin([1, 2, 4, 5, 6, 0]), 0)
  assert.equal(findMin([1, 2, 4, 5, 6, -1]), -1)
  assert.equal(findMin([0, 2, 4, 5, 6, -2, -1]), -2)
  assert.end()
})
