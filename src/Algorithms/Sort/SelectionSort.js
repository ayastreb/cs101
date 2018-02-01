module.exports = input => {
  for (let i = 0; i < input.length; i++) {
    let min = i
    for (let j = i + 1; j < input.length; j++) {
      if (input[j] < input[min]) min = j
    }

    if (min !== i) {
      let tmp = input[i]
      input[i] = input[min]
      input[min] = tmp
    }
  }

  return input
}
