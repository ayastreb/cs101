const test = require('tape')
/**
 * Given a sorted integer array, return the summary of its ranges.
 * Example:
 * Input: [0,1,2,4,5,7]
 * Output: ["0->2","4->5","7"]
 *
 * @param {Array} nums
 * @return {Array}
 */
function summary(nums) {
  const ranges = []
  let start = nums[0]
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]
    const next = nums[i + 1]
    if (next !== curr && next !== curr + 1) {
      ranges.push(start === curr ? `${start}` : `${start}->${curr}`)
      start = next
    }
  }

  return ranges
}

test('handle single element', assert => {
  assert.deepEqual(summary([2]), ['2'])
  assert.end()
})

test('handle multiple ranges, no duplicagtes', assert => {
  assert.deepEqual(summary([0, 1, 2, 4, 5, 7]), ['0->2', '4->5', '7'])
  assert.deepEqual(summary([0, 2, 3, 4, 6, 8, 9]), ['0', '2->4', '6', '8->9'])
  assert.end()
})

test('handle multiple ranges, with duplicagtes', assert => {
  assert.deepEqual(summary([1, 1, 2, 3, 4, 5, 5, 7]), ['1->5', '7'])
  assert.deepEqual(summary([0, 2, 2, 3, 4, 8, 9]), ['0', '2->4', '8->9'])
  assert.end()
})

test('handle multiple ranges, with negatives', assert => {
  assert.deepEqual(summary([-2, -1, 0, 1, 5, 6, 7]), ['-2->1', '5->7'])
  assert.deepEqual(summary([-5, -2, -1, 1, 2, 3]), ['-5', '-2->-1', '1->3'])
  assert.end()
})
