const test = require('tape')
/**
 * Given two arrays, find the difference between them.
 * Example:
 * [1, 2, 3] and [2, 4, 1] => [3, 4]
 * ['A', 'B'] and ['C', 'D', 'A', 'E'] => ['B', 'C', 'D', 'E']
 *
 * We can solve it by looping through all elements of both arrays
 * and keeping track of unique items in a hash table.
 * Resulting diff will be an array of unique items of both input arrays.
 *
 * Time complexity: O(n)
 * @param {Array} first
 * @param {Array} second
 */
function diff(first, second) {
  const unique = new Map()

  return first
    .concat(second)
    .map(item => {
      unique.set(item, !unique.has(item))
      return item
    })
    .filter(item => unique.get(item))
}

test('it finds difference in arrays', assert => {
  assert.deepEqual(diff([1, 2, 3], [2, 4, 1]), [3, 4])
  assert.deepEqual(diff(['A', 'B'], ['C', 'D', 'A', 'E']), ['B', 'C', 'D', 'E'])
  assert.end()
})

test('it returns first array if second is empty', assert => {
  assert.deepEqual(diff([1, 2], []), [1, 2])
  assert.end()
})

test('it finds difference in array with multiple similar items', assert => {
  assert.deepEquals(diff([1, 2, 2, 2, 3, 5], [1, 2, 5, 5, 6]), [3, 6])
  assert.end()
})
