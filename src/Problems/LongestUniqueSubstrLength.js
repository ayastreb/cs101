module.exports = input => {
  const map = {}
  let start = 0
  let max = 0

  for (let index = 0; index < input.length; index++) {
    if (map[input[index]] >= start) {
      start = map[input[index]] + 1
    } else {
      max = Math.max(max, index - start + 1)
    }
    map[input[index]] = index
  }

  return max
}
