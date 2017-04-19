const test = require('tape')
const diff = require('./ArrayDiff')

test('it finds difference in arrays', assert => {
  assert.deepEqual(diff([1, 2, 3], [2, 4, 1]), [3, 4])
  assert.deepEqual(diff(['A', 'B'], ['C', 'D', 'A', 'E']), ['B', 'C', 'D', 'E'])
  assert.end()
})

test('it returns first array if second is empty', assert => {
  assert.deepEqual(diff([1, 2], []), [1, 2])
  assert.end()
})
