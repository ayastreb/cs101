module.exports = input => {
  for (let unsortedIndex = 1; unsortedIndex < input.length; unsortedIndex++) {
    for (let sortedIndex = unsortedIndex; sortedIndex > 0; sortedIndex--) {
      if (input[sortedIndex] > input[sortedIndex - 1]) break
      let tmp = input[sortedIndex - 1]
      input[sortedIndex - 1] = input[sortedIndex]
      input[sortedIndex] = tmp
    }
  }
  return input
}
