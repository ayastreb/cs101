const test = require('tape')
/**
 * Given N*N `maze` with letters in each cell and a string `word`,
 * check if it's possible to find this word in a maze, meaning that all letters
 * in the word are adjacent in the maze. Every letter can only be used once.
 *
 * Example:
 *
 * maze: [['X','X','H','X'],
 *        ['X','L','E','X'],
 *        ['X','L','O','X'],
 *        ['X','X','X','X']]
 * word: 'HELLO'
 * output: true => it is possible to find word 'HELLO' in given maze.
 *
 * @param {Array} maze
 * @param {String} word
 * @returns {Boolean}
 */
function findWord(maze, word) {
  const N = maze.length

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (findStartingAt(row, col)) return true
    }
  }

  return false

  /**
   * Search for word using DFS starting from given cell.
   * Keep a set of visited cells to avoid usign same cell more than once.
   *
   * @param {Number} row
   * @param {Number} col
   * @param {Number} position
   * @param {Set} visited
   * @returns {Boolean}
   */
  function findStartingAt(row, col, position = 0, visited = new Set()) {
    if (maze[row][col] !== word[position]) return false
    if (visited.has(row * N + col)) return false
    visited.add(row * N + col)

    position++
    if (position === word.length) return true

    for (const neighbor of neighbors({ row, col })) {
      if (findStartingAt(neighbor.row, neighbor.col, position, visited)) {
        return true
      }
    }
  }

  /**
   * Yield all valid neighbors adjacent to given cell.
   *
   * @param {Object} cell { row: Number, col: Number }
   */
  function* neighbors(cell) {
    for (const [nextRow, nextCol] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const row = cell.row + nextRow
      const col = cell.col + nextCol
      if (row >= 0 && col >= 0 && row < N && col < N) {
        yield { row, col }
      }
    }
  }
}

test('it does not find the word', assert => {
  assert.equal(
    findWord(
      [
        ['X', 'X', 'H', 'X'],
        ['X', 'L', 'E', 'X'],
        ['X', 'L', 'O', 'X'],
        ['X', 'X', 'X', 'X']
      ],
      'HOLA'
    ),
    false
  )
  assert.end()
})

test('it finds the word in simple maze', assert => {
  assert.equal(
    findWord(
      [
        ['X', 'X', 'H', 'X'],
        ['X', 'L', 'E', 'X'],
        ['X', 'L', 'O', 'X'],
        ['X', 'X', 'X', 'X']
      ],
      'HELLO'
    ),
    true
  )
  assert.end()
})

test('it does not use same letter twice', assert => {
  assert.equal(
    findWord(
      [
        ['X', 'X', 'H', 'X'],
        ['X', 'L', 'E', 'X'],
        ['X', 'L', 'O', 'X'],
        ['X', 'X', 'X', 'X']
      ],
      'HELLOELLO'
    ),
    false
  )
  assert.end()
})

test('it finds multiple words in maze', assert => {
  const maze = [
    ['X', 'X', 'X', 'X'],
    ['X', 'A', 'H', 'E'],
    ['X', 'L', 'O', 'L'],
    ['X', 'P', 'O', 'L']
  ]
  assert.equal(findWord(maze, 'HOLA'), true)
  assert.equal(findWord(maze, 'HELLO'), true)
  assert.equal(findWord(maze, 'HOOPLA'), true)
  assert.end()
})

test('single letter maze', assert => {
  const maze = [['A']]
  assert.equal(findWord(maze, 'A'), true)
  assert.equal(findWord(maze, 'B'), false)
  assert.end()
})
