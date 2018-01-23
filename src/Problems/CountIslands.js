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

  get isInBounds() {
    return (
      this.row >= 0 &&
      this.col >= 0 &&
      this.row < this.grid.length &&
      this.col < this.grid[this.row].length
    )
  }

  get value() {
    return this.grid[this.row][this.col]
  }

  set value(val) {
    this.grid[this.row][this.col] = val
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

  exploreIsland() {
    const queue = new Queue()
    queue.enqueue(this)

    while (queue.length) {
      const cell = queue.dequeue()
      cell.value = EXPLORED
      for (const neighbor of cell.neighbours()) {
        if (neighbor.isLand) queue.enqueue(neighbor)
      }
    }
  }

  *neighbours() {
    for (const [row, col] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const neighbor = new Cell(this.grid, this.row + row, this.col + col)
      if (neighbor.isInBounds) yield neighbor
    }
  }
}

module.exports = input => {
  let islandsCount = 0

  for (const cell of new Grid(input)) {
    if (!cell.isExplored) {
      if (cell.isLand) {
        cell.exploreIsland()
        islandsCount++
      } else {
        cell.value = EXPLORED
      }
    }
  }

  return islandsCount
}
