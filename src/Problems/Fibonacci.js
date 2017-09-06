function recursive(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  return recursive(n - 1) + recursive(n - 2)
}

function tailRecursive(limit) {
  function calculate(n = 0, f1 = 0, f2 = 1) {
    if (n === limit) return f1

    return calculate(n + 1, f2, f1 + f2)
  }

  return calculate()
}

module.exports = {
  recursive,
  tailRecursive
}
