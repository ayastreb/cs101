module.exports = input => {
  for (let outer = input.length; outer > 0; outer--) {
    for (let inner = 0; inner < outer; inner++) {
      if (input[inner] > input[inner + 1]) {
        let tmp = input[inner + 1]
        input[inner + 1] = input[inner]
        input[inner] = tmp
      }
    }
  }

  return input
}
