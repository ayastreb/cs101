module.exports = input => {
  let isSorted = false
  let unsortedLength = input.length
  while (!isSorted) {
    isSorted = true
    for (let inner = 0; inner < unsortedLength; inner++) {
      if (input[inner] > input[inner + 1]) {
        let tmp = input[inner + 1]
        input[inner + 1] = input[inner]
        input[inner] = tmp
        isSorted = false
      }
    }
    unsortedLength--
  }

  return input
}
