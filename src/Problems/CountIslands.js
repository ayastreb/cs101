const test = require('tape')
/**
 * Count number of islands (connected components) in the given grid,
 * where 0 represents water and 1 represents land.
 * Island is considered any amount of land cells adjacent from west, north, east or south.
 *
 * @param {Array} input
 * @returns {Number}
 */
function countIslands(input) {
  if (!Array.isArray(input) || input.find(row => !Array.isArray(row))) {
    throw new Error('Input must be a 2-dimensional array.')
  }

  const LAND = 1
  const VISITED = 2

  let count = 0
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === LAND) {
        explore({ row, col })
        count++
      }
    }
  }

  return count

  /**
   * Explore island at given row/col coordinates.
   * Mark it as explored and visit all its adjacent land cells with a DFS search.
   *
   * @param {Object} island { row: number, col: number }
   */
  function explore(island) {
    const cellsToVisit = [island]

    while (cellsToVisit.length) {
      const cell = cellsToVisit.pop()
      input[cell.row][cell.col] = VISITED

      cellsToVisit.push(...landNeighboursOf(cell))
    }
  }

  /**
   * Yield all valid land cells adjacent to given cell.
   *
   * @param {Object} cell { row: number, col: number }
   */
  function* landNeighboursOf(cell) {
    for (const [nextRow, nextCol] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const row = cell.row + nextRow
      const col = cell.col + nextCol
      if (withinBounds(row, col) && input[row][col] === LAND) {
        yield { row, col }
      }
    }
  }

  /**
   * Check if given coordinates are valid, e.g. within the grid boundaries.
   *
   * @param {Number} row
   * @param {Number} col
   * @returns {Boolean}
   */
  function withinBounds(row, col) {
    return row >= 0 && col >= 0 && row < input.length && col < input[row].length
  }
}

test('throws error with incorrect input', assert => {
  assert.throws(() => countIslands('foo'), Error)
  assert.throws(() => countIslands([[0, 1, 0], 'foo']), Error)
  assert.end()
})

test('count no islands', assert => {
  const input = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
  assert.equal(countIslands(input), 0)
  assert.end()
})

test('count simple islands', assert => {
  const input = [
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1]
  ]
  assert.equal(countIslands(input), 3)
  assert.end()
})

test('count big islands (river)', assert => {
  const input = [
    [1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1]
  ]
  assert.equal(countIslands(input), 2)
  assert.end()
})

test('count island in a lake', assert => {
  const input = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
  ]
  assert.equal(countIslands(input), 2)
  assert.end()
})
