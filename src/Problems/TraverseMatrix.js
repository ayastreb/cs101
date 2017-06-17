/**
 * Given n*n matrix, traverse it clockwise from top left corner.
 * e.g. for following matrix:
 * 1,   2,  3, 4
 * 12, 13, 14, 5
 * 11, 16, 15, 6
 * 10,  9,  8, 7
 * it should return array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
 */
module.exports = input => {
  if (input.length !== input[0].length) {
    throw new RangeError('Matrix must be square')
  }

  const result = []
  const length = input.length
  for (let layer = 0; layer < length / 2; layer++) {
    const first = layer
    const last = length - 1 - layer
    const top = []
    const right = []
    const bottom = []
    const left = []
    for (let i = first; i < last; i++) {
      top.push(input[first][i])
      right.push(input[i][last])
      const offset = i - layer
      bottom.push(input[last][last - offset])
      left.push(input[last - offset][first])
    }
    result.push(...top, ...right, ...bottom, ...left)
  }

  if (length % 2 !== 0) {
    const mid = length / 2 | 0
    result.push(input[mid][mid])
  }

  return result
}
