module.exports = input => {
  const result = []
  let start = 0
  while (start < input.length && input[start] === 0) start++

  let carry = 1
  for (var i = input.length - 1; i >= start; i--) {
    const sum = input[i] + carry
    result.push(sum % 10)
    carry = sum > 9 ? 1 : 0
  }
  if (carry === 1) result.push(carry)

  return result.reverse()
}
