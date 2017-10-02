module.exports = (needle, haystack) => {
  let lo = 0
  let hi = haystack.length - 1
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2)
    if (haystack[mid] === needle) return mid

    if (haystack[lo] <= haystack[mid]) {
      if (needle < haystack[mid] && needle >= haystack[lo]) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    } else {
      if (needle > haystack[mid] && needle <= haystack[hi]) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
  }

  return -1
}
