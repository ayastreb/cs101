const test = require('tape')
/**
 * Given a sorted array, rotated by some unknown value, find given number in it.
 *
 * Example:
 * needle: 5, haystack: [5, 6, 0, 1, 2, 3, 4] - the array is rotated 2 positions to the right.
 * Need to find 5 in O(logN) time.
 *
 * @param {Number} needle
 * @param {Array} haystack
 * @returns {Number}
 */
function rotatedBinarySearch(needle, haystack) {
  let lo = 0
  let hi = haystack.length - 1
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2)
    if (haystack[mid] === needle) return mid

    if (haystack[lo] <= haystack[mid]) {
      if (needle < haystack[mid] && needle >= haystack[lo]) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    } else {
      if (needle > haystack[mid] && needle <= haystack[hi]) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
  }

  return -1
}

test('return -1 when item not found', assert => {
  assert.equal(rotatedBinarySearch(5, [1, 2, 3]), -1)
  assert.equal(rotatedBinarySearch(10, [1, 2, 3, 4]), -1)
  assert.end()
})

test('return index of found item', assert => {
  assert.equal(rotatedBinarySearch(1, [3, 1]), 1)
  assert.equal(rotatedBinarySearch(1, [5, 6, 0, 1, 2, 3, 4]), 3)
  assert.equal(rotatedBinarySearch(2, [5, 6, 0, 1, 2, 3, 4]), 4)
  assert.equal(rotatedBinarySearch(4, [5, 6, 0, 1, 2, 3, 4]), 6)
  assert.equal(rotatedBinarySearch(5, [5, 6, 0, 1, 2, 3, 4]), 0)
  assert.equal(rotatedBinarySearch(5, [0, 1, 2, 3, 4, 5, 6]), 5)
  assert.equal(rotatedBinarySearch(5, [4, 5, 6, -2, -1, 0, 3]), 1)
  assert.equal(rotatedBinarySearch(-1, [4, 5, 6, -2, -1, 0, 3]), 4)
  assert.equal(rotatedBinarySearch(2, [16, 18, 22, 30, 31, 33, 2, 14]), 6)
  assert.equal(rotatedBinarySearch(30, [22, 30, 31, 33, 2, 14, 16, 18]), 1)
  assert.end()
})
