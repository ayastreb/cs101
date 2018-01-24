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
  for (const cell of new Grid(input)) {
    if (cell.isExplored) continue
    if (cell.isLand) islandsCount++
    cell.explore()
  }

  return islandsCount
}

const WATER = 0
const LAND = 1
const EXPLORED = 2

class Grid {
  constructor(input) {
    this.data = input
  }

  *[Symbol.iterator]() {
    for (let row = 0; row < this.data.length; row++) {
      for (let col = 0; col < this.data[row].length; col++) {
        yield new Cell(this.data, row, col)
      }
    }
  }
}

class Cell {
  constructor(grid, row, col) {
    this.grid = grid
    this.row = row
    this.col = col
  }

  get value() {
    return this.grid[this.row][this.col]
  }

  get isExplored() {
    return this.value === EXPLORED
  }

  get isWater() {
    return this.value === WATER
  }

  get isLand() {
    return this.value === LAND
  }

  markAsExplored() {
    this.grid[this.row][this.col] = EXPLORED
  }

  /**
   * When exploring water, just mark cell as explored.
   * Otherwise - we're exploring an island and we mark all adjacent land cells as
   * explored using DFS (depth first search), but BFS can also be used.
   */
  explore() {
    if (this.isWater) return this.markAsExplored()

    const stack = []
    stack.push(this)

    while (stack.length) {
      const cell = stack.pop()
      cell.markAsExplored()
      for (const neighbor of cell.neighbours()) {
        if (neighbor.isLand) stack.push(neighbor)
      }
    }
  }

  /**
   * Generate cell's neighbours in west, east, north and south directions.
   */
  *neighbours() {
    for (const [row, col] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const neighborRow = this.row + row
      const neighborCol = this.col + col
      if (isWithinBounds(this.grid, neighborRow, neighborCol)) {
        yield new Cell(this.grid, neighborRow, neighborCol)
      }
    }
  }
}

function isWithinBounds(grid, row, col) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[row].length
}
