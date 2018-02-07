const test = require('tape')
/**
 * Given N*M (square or rectangular) matrix, traverse it clockwise from top left corner.
 * e.g. for following matrix:
 * 1,   2,  3, 4
 * 12, 13, 14, 5
 * 11, 16, 15, 6
 * 10,  9,  8, 7
 * it should return array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
 *
 * @param {Array} input
 * @returns {Array}
 */
function traverse(input) {
  const height = input.length
  let result = []
  let level = 0
  do {
    walk(level++)
  } while (level <= Math.floor(height / 2))

  // if matrix is a square of odd size, add middle element to the end
  if (height === input[0].length && height % 2 !== 0) {
    const mid = Math.floor(height / 2)
    result.push(input[mid][mid])
  }

  return result

  function walk(level) {
    let height = input.length - level - 1
    if (level > 0 && height === 0) return
    let width = input[height].length - level - 1

    for (let i = level; i < width; i++) {
      result.push(input[level][i])
    }
    for (let i = level; i < height; i++) {
      result.push(input[i][width])
    }
    for (let i = width; i > level; i--) {
      result.push(input[height][i])
    }
    for (let i = height; i > level; i--) {
      result.push(input[i][level])
    }
  }
}

const range = (start, count) => {
  return Array.apply(0, new Array(count)).map((element, index) => index + start)
}

test('single element matrix', assert => {
  const matrix = [[1]]
  assert.deepEqual(traverse(matrix), [1])
  assert.end()
})

test('two element matrix', assert => {
  const matrix = [[1, 2]]
  assert.deepEqual(traverse(matrix), [1, 2])
  assert.end()
})

test('square matrix with even side length', assert => {
  // prettier-ignore
  const matrix = [
    [1, 2, 3, 4], 
    [12, 13, 14, 5],
    [11, 16, 15, 6], 
    [10, 9, 8, 7]
  ]
  assert.deepEqual(traverse(matrix), range(1, 16))
  assert.end()
})

test('square matrix with odd side length', assert => {
  const matrix = [
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
  ]
  assert.deepEqual(traverse(matrix), range(1, 25))
  assert.end()
})

test('rectangular matrix with even side length', assert => {
  // prettier-ignore
  const matrix = [
    [1, 2, 3, 4], 
    [10, 11, 12, 5], 
    [9, 8, 7, 6]
  ]
  assert.deepEqual(traverse(matrix), range(1, 12))
  assert.end()
})

test('rectangular matrix with even side length', assert => {
  // prettier-ignore
  const matrix = [
    [1, 2, 3, 4, 5],  
    [10, 9, 8, 7, 6]
  ]
  assert.deepEqual(traverse(matrix), range(1, 10))
  assert.end()
})

test('rectangular matrix with odd side length', assert => {
  const matrix = [
    [1, 2, 3, 4, 5],
    [14, 15, 16, 17, 6],
    [13, 20, 19, 18, 7],
    [12, 11, 10, 9, 8]
  ]
  assert.deepEqual(traverse(matrix), range(1, 20))
  assert.end()
})
