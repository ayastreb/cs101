/**
 * Count number of islands (connected components) in the given grid,
 * where 0 represents water and 1 represents land.
 * Island is considered any amount of land cells adjacent from west, north, east or south.
 *
 * @param {Array} input
 * @returns {Number}
 */
module.exports = input => {
  if (!Array.isArray(input) || input.find(row => !Array.isArray(row))) {
    throw new Error('Input must be a 2-dimensional array.')
  }

  let islandsCount = 0
  const grid = new Grid(input)
  for (const island of grid.islands()) {
    grid.explore(island)
    islandsCount++
  }

  return islandsCount
}

const LAND = 1
const VISITED = 2

class Grid {
  constructor(input) {
    this.data = input
  }

  /**
   * Iterate over grid and yield each land cell encountered.
   */
  *islands() {
    for (let row = 0; row < this.data.length; row++) {
      for (let col = 0; col < this.data[row].length; col++) {
        if (this.data[row][col] === LAND) {
          yield { row, col }
        }
      }
    }
  }

  /**
   * Explore island at given row/col coordinates.
   * Mark it as explored and visit all its adjacent land cells with a DFS search.
   *
   * @param {Object} island { row: number, col: number }
   */
  explore(island) {
    const cellsToVisit = [island]

    while (cellsToVisit.length) {
      const cell = cellsToVisit.pop()
      this.data[cell.row][cell.col] = VISITED

      cellsToVisit.push(...this.landNeighboursOf(cell))
    }
  }

  /**
   * Yield all valid land cells adjacent to gievn cell.
   *
   * @param {Object} cell { row: number, col: number }
   */
  *landNeighboursOf(cell) {
    for (const [nextRow, nextCol] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const row = cell.row + nextRow
      const col = cell.col + nextCol
      if (this.isWithinBounds(row, col) && this.data[row][col] === LAND) {
        yield { row, col }
      }
    }
  }

  /**
   * Check if given coordinates are valid, e.g. withtin the grid boundaries.
   *
   * @param {Number} row
   * @param {Number} col
   * @returns {Boolean}
   */
  isWithinBounds(row, col) {
    const rows = this.data.length

    return row >= 0 && col >= 0 && row < rows && col < this.data[row].length
  }
}
