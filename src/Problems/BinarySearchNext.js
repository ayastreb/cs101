const test = require('tape')
/**
 * Find next number in given sorted array, greater than given query number.
 * Return first number if query is smaller than first element.
 * Return -1 if query is greater or equal to last element.
 *
 * @param {Number} needle
 * @param {Array} haystack
 * @return {Number}
 */
function binarySearchNext(needle, haystack) {
  if (!Array.isArray(haystack) || haystack.length === 0) return -1
  let lo = 0
  let hi = haystack.length - 1
  if (needle < haystack[lo]) return haystack[lo]
  if (needle >= haystack[hi]) return -1

  while (lo < hi) {
    let mid = Math.floor((lo + hi) / 2)
    if (haystack[mid] === needle) return haystack[mid + 1]
    if (haystack[mid] > needle) {
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  return haystack[hi] === needle ? haystack[hi + 1] : haystack[hi]
}

test('it returns -1 if no haystack given', assert => {
  assert.equal(binarySearchNext(5, undefined), -1)
  assert.equal(binarySearchNext(5, null), -1)
  assert.equal(binarySearchNext(5, false), -1)
  assert.equal(binarySearchNext(5, []), -1)
  assert.end()
})

test('it returns -1 if there are no greater element', assert => {
  assert.equal(binarySearchNext(9, [1, 3, 4, 7, 9]), -1)
  assert.equal(binarySearchNext(10, [1, 3, 4, 7, 9]), -1)
  assert.end()
})

test('it finds next value greater than query', assert => {
  assert.equal(binarySearchNext(0, [2, 14, 16, 20, 22, 30]), 2)
  assert.equal(binarySearchNext(1, [2, 14, 16, 20, 22, 30]), 2)
  assert.equal(binarySearchNext(2, [2, 14, 16, 20, 22, 30]), 14)
  assert.equal(binarySearchNext(5, [2, 14, 16, 20, 22, 30]), 14)
  assert.equal(binarySearchNext(18, [2, 14, 16, 20, 22, 30]), 20)
  assert.equal(binarySearchNext(20, [2, 14, 16, 20, 22, 30]), 22)
  assert.equal(binarySearchNext(22, [2, 14, 16, 20, 22, 30]), 30)
  assert.equal(binarySearchNext(23, [2, 14, 16, 20, 22, 30]), 30)
  assert.equal(binarySearchNext(21, [2, 14, 16, 20, 22]), 22)
  assert.end()
})
