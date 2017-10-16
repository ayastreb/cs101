const test = require('tape')
const addOne = require('./AddOne')

test('it adds one', assert => {
  assert.deepEqual(addOne([0, 9]), [1, 0])
  assert.deepEqual(addOne([9, 9]), [1, 0, 0])
  assert.deepEqual(addOne([1, 9, 9]), [2, 0, 0])
  assert.deepEqual(addOne([1, 2, 3]), [1, 2, 4])
  assert.deepEqual(addOne([0, 1, 2, 3]), [1, 2, 4])
  assert.end()
})
