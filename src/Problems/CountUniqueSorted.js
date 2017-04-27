const createLinkedList = require('../DataStructures/SinglyLinkedList')
/**
 * Given a sorted array of numbers, return the number of unique numbers.
 * Example:
 * [1, 3, 3, 5, 6, 7, 7, 7, 15] => 6 (1, 3, 5, 6, 7, 15)
 *
 * We can solve it using linked list, since all the items are sorted.
 * We can iterate input array and add number to the list
 * only if it's different from list head.
 * Size of the list will be equal to number of unique numbers in the end.
 *
 * Performance: O(n)
 * @param {Array} input
 */
module.exports = input => {
  const list = createLinkedList()
  for (let item of input) {
    if (item !== list.first) list.addFirst(item)
  }

  return list.length
}
