const Queue = require('../DataStructures/Queue')

const WATER = 0
const LAND = 1
const EXPLORED = 2

class Grid {
  /**
   * @param {Array} input
   */
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

  explore() {
    if (this.isWater) return this.markAsExplored()

    const queue = new Queue()
    queue.enqueue(this)

    while (queue.length) {
      const cell = queue.dequeue()
      cell.markAsExplored()
      for (const neighbor of cell.neighbours()) {
        if (neighbor.isLand) queue.enqueue(neighbor)
      }
    }
  }

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

module.exports = input => {
  let islandsCount = 0
  for (const cell of new Grid(input)) {
    if (!cell.isExplored) {
      if (cell.isLand) islandsCount++
      cell.explore()
    }
  }

  return islandsCount
}
