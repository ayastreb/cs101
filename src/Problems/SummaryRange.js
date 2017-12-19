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
  const ranges = []
  let prev = nums[0]
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]
    const next = nums[i + 1]
    if (next !== curr && next !== curr + 1) {
      ranges.push(prev === curr ? `${prev}` : `${prev}->${curr}`)
      prev = next
    }
  }

  return ranges
}
