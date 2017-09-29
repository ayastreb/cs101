const test = require('tape')
const product = require('./ArrayProductExceptSelf')

test('calculate product', assert => {
  assert.deepEqual(product([1, 2, 3, 4]), [24, 12, 8, 6])
  assert.deepEqual(product([5, 3, 2, 5]), [30, 50, 75, 30])
  assert.deepEqual(product([1, 2, 3, 4, 5]), [120, 60, 40, 30, 24])
  assert.end()
})
