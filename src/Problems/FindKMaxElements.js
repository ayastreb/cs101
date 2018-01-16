const MinHeap = require('../DataStructures/MinHeap')
/**
 * Find k max elements from given input array.
 *
 * @param {array} input
 * @param {number} k
 * @return {array}
 */
module.exports = (input, k) => {
  const heap = new MinHeap()

  for (let i = 0; i < input.length; i++) {
    if (i < k) {
      heap.insert(input[i])
    } else if (input[i] > heap.findMin()) {
      heap.replace(input[i])
    }
  }

  const result = []
  while (heap.length) result.push(heap.extractMin())

  return result
}
