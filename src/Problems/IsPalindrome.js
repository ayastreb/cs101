module.exports = input => {
  if (input.length <= 1) return true

  let left = 0
  let right = input.length - 1
  let isChar = /[a-z0-9]/i
  const inputLower = input.toLowerCase()
  while (left < right) {
    if (inputLower[left].match(isChar) && inputLower[right].match(isChar)) {
      if (inputLower[left] !== inputLower[right]) return false
      left++
      right--
    } else if (!inputLower[left].match(isChar)) {
      left++
    } else {
      right--
    }
  }
  return true
}
