const test = require('tape')
const maxSubarraySum = require('./MaximumSubarraySum')

test('it calculates maximum subarray sum', assert => {
  assert.equal(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5]), 6)
  assert.equal(maxSubarraySum([2, 3, -1, -20, 5, 10]), 15)
  assert.end()
})
