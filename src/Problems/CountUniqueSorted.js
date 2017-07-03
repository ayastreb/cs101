/**
 * Given a sorted array of numbers, return the number of unique numbers.
 * Example:
 * [1, 3, 3, 5, 6, 7, 7, 7, 15] => 6 (1, 3, 5, 6, 7, 15)
 *
 * We can iterate over array and compare each item with next item.
 *
 * Performance: O(n)
 * @param {Array} input
 */
module.exports = input => {
  if (input.length <= 1) return input.length

  let counter = 1
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] !== input[i + 1]) counter++
  }

  return counter
}
