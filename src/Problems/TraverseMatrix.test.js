const test = require('tape')
const traverse = require('./TraverseMatrix')

const range = (start, count) => {
  return Array.apply(0, new Array(count)).map((element, index) => index + start)
}

test('matrix with even side length', assert => {
  const matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
  ]
  assert.deepEqual(traverse(matrix), range(1, 16))
  assert.end()
})

test('matrix with odd side length', assert => {
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

test('invalid matrix: not square', assert => {
  const matrix = [
    [1, 2, 3],
    [6, 5, 4]
  ]
  assert.throws(() => traverse(matrix))
  assert.end()
})
