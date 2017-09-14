/**
 * Given an array of integers, return array with next greater number for each
 * element in array. If there is no greater number for an item - return "-1".
 * For example:
 * [2, 10, 5, 8, 4, 2] => [10, -1, 8, -1, -1, -1]
 *
 * @param {array} input
 */
module.exports = input => {
  const greater = []
  for (let index = input.length - 1; index >= 0; index--) {
    let current = input[index]
    let next = greater.pop()
    while (greater.length > 0 && next <= current) next = greater.pop()

    if (next > current) {
      input[index] = next
      greater.push(next)
    } else {
      input[index] = -1
    }
    greater.push(current)
  }

  return input
}
