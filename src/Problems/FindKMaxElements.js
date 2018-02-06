const test = require('tape')
const MinHeap = require('../DataStructures/MinHeap')
/**
 * Find k max elements from given input array.
 *
 * @param {array} input
 * @param {number} k
 * @return {array}
 */
function findMaxElements(input, k) {
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

test('it should return k max elements from given array', assert => {
  assert.deepEqual(findMaxElements([1, 2, 5, 3, 10, 6, 0, 7], 3), [6, 7, 10])
  assert.deepEqual(findMaxElements([3, 1, 2], 5), [1, 2, 3])
  assert.end()
})
