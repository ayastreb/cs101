module.exports = input => {
  for (let outer = 0; outer < input.length; outer++) {
    for (let inner = outer; inner < input.length; inner++) {
      if (input[inner] < input[outer]) {
        let tmp = input[inner]
        input[inner] = input[outer]
        input[outer] = tmp
      }
    }
  }
  return input
}
