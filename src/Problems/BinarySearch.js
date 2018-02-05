const test = require('tape')
/**
 * Find given number in a sorted array of numbers.
 * Return its index if found, -1 otherwise.
 *
 * @param {Number} needle
 * @param {Array} haystack
 * @return {Number}
 */
function binarySearch(needle, haystack) {
  let lo = 0
  let hi = haystack.length - 1
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2)
    if (haystack[mid] === needle) return mid
    if (haystack[mid] > needle) {
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  return -1
}

test('return -1 when item not found', assert => {
  assert.equal(binarySearch(5, [1, 2, 3]), -1)
  assert.end()
})

test('return index of found item', assert => {
  assert.equal(binarySearch(1, [0, 1, 2, 3, 4, 5, 6]), 1)
  assert.equal(binarySearch(2, [2, 14, 16, 18, 22, 30, 31, 33]), 0)
  assert.equal(binarySearch(16, [2, 14, 16, 18, 22, 30, 31, 33]), 2)
  assert.equal(binarySearch(31, [2, 14, 16, 18, 22, 30, 31, 33]), 6)
  assert.equal(binarySearch(33, [2, 14, 16, 18, 22, 30, 31, 33]), 7)
  assert.equal(binarySearch(-2, [-2, -1, 0, 14, 16, 18, 22, 30]), 0)
  assert.equal(binarySearch(-1, [-2, -1, 0, 14, 16, 18, 22, 30]), 1)
  assert.end()
})
