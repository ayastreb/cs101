module.exports = input => {
  const sub = []
  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j <= input.length - i; j++) {
      sub.push(input.substr(i, j))
    }
  }
  return sub
}
