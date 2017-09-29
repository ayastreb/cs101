module.exports = input => {
  const rows = []

  for (let column = 0; column < input.length; column++) {
    for (let row = input[column]; row >= 0; row--) {
      if (!rows[row]) rows[row] = new Array(input.length).fill(' ')
      rows[row][column] = '*'
    }
  }

  return rows
    .reverse()
    .map(row => row.join(''))
    .join('\n')
}
