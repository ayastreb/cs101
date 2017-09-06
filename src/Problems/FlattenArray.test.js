const test = require('tape')
const flatten = require('./FlattenArray')

test('flattens nested arrays', assert => {
  var input = [1, [2, 3, [4]], 5, [6], 7]
  assert.deepEqual(flatten(input), [1, 2, 3, 4, 5, 6, 7])
  assert.deepEqual(
    input,
    [1, [2, 3, [4]], 5, [6], 7],
    'input should not be mutated'
  )
  assert.end()
})
