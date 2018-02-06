const test = require('tape')
/**
 * Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
 * (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
 * Find the minimum element.
 *
 * @param {array} nums
 */
function findMin(nums) {
  function search(lo, hi) {
    if (lo >= hi || nums[lo] < nums[hi]) return nums[lo]

    const mid = Math.floor((lo + hi) / 2)
    return nums[mid] >= nums[lo] ? search(mid + 1, hi) : search(lo, mid)
  }

  return search(0, nums.length - 1)
}

test('find min valeu of rotated array', assert => {
  assert.equal(findMin([4, 5, 6, 7, 0, 1, 2]), 0)
  assert.equal(findMin([7, 0, 1, 2, 4, 5, 6]), 0)
  assert.equal(findMin([5, 6, 7, 0, 1, 2, 4]), 0)
  assert.equal(findMin([0, 1, 2, 4, 5, 6]), 0)
  assert.equal(findMin([1, 2, 4, 5, 6, 0]), 0)
  assert.equal(findMin([1, 2, 4, 5, 6, -1]), -1)
  assert.equal(findMin([0, 2, 4, 5, 6, -2, -1]), -2)
  assert.end()
})
