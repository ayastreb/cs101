/**
 * You are given a NxN board with robots (2) and walls (1) scattered all about. You are given only one bomb.
 * Your mission is to kill as many robots as possible.
 *
 * A few constraints:
 *
 * - the impact of the bomb travels only horizontally and vertically
 * - the impact goes through robots but NOT walls and of course, ends at the border
 * - can only place bombs on spaces NOT occupied by walls or robots
 *
 * @param {Array} input 2-D matrix of NxN with robots represented by 2 and walls represented by 1. Empty spaces are marked as 0.
 * @returns {Array} list of coordinates (row index and column index) where the bomb kills the most robots.
 */
module.exports = input => {
  let maxHits = 0
  const grid = new Grid(input)
  for (const cell of grid) {
    maxHits = Math.max(maxHits, cell.totalHits)
  }

  return grid.cells
    .filter(cell => cell.totalHits > 0 && cell.totalHits === maxHits)
    .map(cell => `${cell.row}:${cell.col}`)
}

const EMPTY = 0
const WALL = 1
const ROBOT = 2
const HORIZONTAL = Symbol('Horizontal')
const VERTICAL = Symbol('Vertical')

class Grid {
  /**
   * @param {Array} input
   */
  constructor(input) {
    this.data = input
    this.cells = []
  }

  /**
   * @param {Number} row
   * @param {Number} col
   * @returns {Cell|undefined}
   */
  cellAt(row, col) {
    if (row >= this.data.length || col >= this.data[row].length) return

    const index = row * this.data.length + col
    if (!this.cells[index]) {
      const cell = new Cell(this.data[row][col], row, col)
      if (!cell.isWall) {
        cell.neighbor[HORIZONTAL] = this.cellAt(row, col + 1)
        cell.neighbor[VERTICAL] = this.cellAt(row + 1, col)
      }
      this.cells[index] = cell
    }

    return this.cells[index]
  }

  *[Symbol.iterator]() {
    for (let row = 0; row < this.data.length; row++) {
      for (let col = 0; col < this.data[row].length; col++) {
        yield this.cellAt(row, col)
      }
    }
  }
}

class Cell {
  /**
   * @param {Number} value
   * @param {Number} row
   * @param {Number} col
   */
  constructor(value, row, col) {
    this.value = value
    this.row = row
    this.col = col
    this.neighbor = { HORIZONTAL, VERTICAL }
    this.hits = { HORIZONTAL, VERTICAL }
  }

  get isEmpty() {
    return this.value === EMPTY
  }

  get isWall() {
    return this.value === WALL
  }

  get isRobot() {
    return this.value === ROBOT
  }

  /**
   * Each cell's total hits number is equal to sum of robots it could hit in its row and its column.
   *
   * @returns {Number}
   */
  get totalHits() {
    if (this.isWall) return 0
    if (this.hits[HORIZONTAL] === undefined) this.explore(HORIZONTAL)
    if (this.hits[VERTICAL] === undefined) this.explore(VERTICAL)

    return this.hits[HORIZONTAL] + this.hits[VERTICAL]
  }

  /**
   * Explore all available cells in given direction (e.g. until we hit the wall or grid border).
   * Count how many robots we encounter along the way and set this number as
   * hit counter value for all empty cells we've traversed through.
   *
   * @param {Symbol} direction HORIZONTAL or VERTICAL
   */
  explore(direction) {
    const emptyCells = []
    let hitCount = 0
    let cell = this

    while (cell) {
      if (cell.isEmpty) emptyCells.push(cell)
      if (cell.isRobot) {
        cell.hits[direction] = 0
        hitCount++
      }
      cell = cell.neighbor[direction]
    }

    for (const cell of emptyCells) {
      cell.hits[direction] = hitCount
    }
  }
}
