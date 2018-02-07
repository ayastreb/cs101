const test = require('tape')
/**
 * Given an NxN matrix, rotate it 90 degrees clockwise.
 *
 * @param {Array} input
 * @returns {Array}
 */
function rotate(input) {
  for (let first = 0; first < input.length / 2; first++) {
    const last = input.length - first - 1
    for (let i = first; i < last; i++) {
      const offset = i - first
      const top = input[first][i]
      // left to top
      input[first][i] = input[last - offset][first]
      // bottom to left
      input[last - offset][first] = input[last][last - offset]
      // right to bottom
      input[last][last - offset] = input[i][last]
      // top to right
      input[i][last] = top
    }
  }

  return input
}

test('it rotates the matrix', assert => {
  const matrix = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P']
  ]
  const expected = [
    ['M', 'I', 'E', 'A'],
    ['N', 'J', 'F', 'B'],
    ['O', 'K', 'G', 'C'],
    ['P', 'L', 'H', 'D']
  ]
  assert.deepEqual(rotate(matrix), expected)
  assert.end()
})
