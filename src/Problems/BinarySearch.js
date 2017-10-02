module.exports = (needle, haystack) => {
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
