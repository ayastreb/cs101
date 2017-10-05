/**
 * Find next number in given sorted array, greater than given query number.
 * Return first number if query is smaller than first element.
 * Return -1 if query is greater or equal to last element.
 *
 * @param {number} needle
 * @param {array} haystack
 * @return {number}
 */
module.exports = (needle, haystack) => {
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
