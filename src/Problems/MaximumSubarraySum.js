const test = require('tape')
/**
 * Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
 *
 * For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
 * the contiguous subarray [4,-1,2,1] has the largest sum = 6.
 *
 * @param {Array} input
 * @return {Number}
 */
function maxSubarraySum(input) {
  if (input.length < 1) return null

  let localMax = input[0]
  let globalMax = input[0]
  for (let i = 1; i < input.length; i++) {
    localMax = Math.max(localMax + input[i], input[i])
    globalMax = Math.max(globalMax, localMax)
  }

  return globalMax
}

test('it calculates maximum subarray sum', assert => {
  assert.equal(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5]), 6)
  assert.equal(maxSubarraySum([2, 3, -1, -20, 5, 10]), 15)
  assert.end()
})
