/**
 * Given a sorted integer array, return the summary of its ranges.
 * Example:
 * Input: [0,1,2,4,5,7]
 * Output: ["0->2","4->5","7"]
 *
 * @param {array} nums
 * @return {array}
 */
module.exports = nums => {
  if (nums.length === 1) return [`${nums[0]}`]
  const result = []
  let left = nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] !== nums[i] && nums[i + 1] !== nums[i] + 1) {
      let right = nums[i]
      result.push(left === right ? `${left}` : `${left}->${right}`)
      left = nums[i + 1]
    }
  }

  return result
}
