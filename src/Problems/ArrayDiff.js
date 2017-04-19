const createHashTable = require('../DataStructures/HashTable')
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
 * Performance: O(n)
 * @param {Array} first
 * @param {Array} second
 */
module.exports = (first, second) => {
  const unique = createHashTable()
  const merged = []
  const merge = input => {
    for (let item of input) {
      merged.push(item)
      unique.set(item, !unique.get(item))
    }
  }

  merge(first)
  merge(second)

  return merged.filter(item => unique.get(item))
}
