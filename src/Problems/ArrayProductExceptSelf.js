const test = require('tape')

/**
 * Given an array of n integers where n > 1, nums,
 * return an array output such that output[i] is equal to the product
 * of all the elements of nums except nums[i].
 *
 * For example, given [1,2,3,4], return [24,12,8,6].
 *
 * @param {array} input
 * @return {array}
 */
function arrayProductExceptSelf(input) {
  const n = input.length
  let result = new Array(n).fill(1)
  let leftProduct = 1
  let rightProduct = 1

  for (let index = 0; index < n; index++) {
    result[index] *= leftProduct
    leftProduct *= input[index]
    result[n - index - 1] *= rightProduct
    rightProduct *= input[n - index - 1]
  }

  return result
}

test('calculate product', assert => {
  assert.deepEqual(arrayProductExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6])
  assert.deepEqual(arrayProductExceptSelf([5, 3, 2, 5]), [30, 50, 75, 30])
  assert.deepEqual(arrayProductExceptSelf([1, 2, 3, 4, 5]), [
    120,
    60,
    40,
    30,
    24
  ])
  assert.end()
})
