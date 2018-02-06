const test = require('tape')
/**
 * Given array possibly containing other nested arrays, return a flat array.
 *
 * Example:
 * input: [1, [2, 3, [4]], 5, [6], 7]
 * output: [1, 2, 3, 4, 5, 6, 7]
 *
 * @param {Array} input
 * @returns {Array}
 */
function flatten(input) {
  const flat = []
  input.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item))
    } else {
      flat.push(item)
    }
  })

  return flat
}

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
