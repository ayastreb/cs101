module.exports = input => {
  for (let outer = 1; outer < input.length; outer++) {
    for (let inner = outer; inner > 0; inner--) {
      if (input[inner - 1] < input[inner]) break
      let tmp = input[inner]
      input[inner] = input[inner - 1]
      input[inner - 1] = tmp
    }
  }
  return input
}
