const test = require('tape')

/**
 * Given an array of non-negative integers, draw a histogram of those values.
 * Each item in the array represents the height of the column.
 *
 * @param {Array} input
 * @retunrs {String}
 */
function histogram(input) {
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

test('draw histogram', assert => {
  const expected = [
    '*     ',
    '**  * ',
    '** ** ',
    '** ** ',
    '** ***',
    '******'
  ].join('\n')

  assert.equal(histogram([5, 4, 0, 3, 4, 1]), expected)
  assert.end()
})

test('draw histogram', assert => {
  const expected = [
    '  *   ',
    ' ** * ',
    ' **** ',
    ' **** ',
    ' *****',
    '******'
  ].join('\n')

  assert.equal(histogram([0, 4, 5, 3, 4, 1]), expected)
  assert.end()
})
