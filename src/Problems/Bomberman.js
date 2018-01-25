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
   * @returns {Number} on of EMPTY, WALL or ROBOT.
   */
  valueAt(row, col) {
    return this.data[row][col]
  }

  /**
   * @param {Number} row
   * @param {Number} col
   * @returns {Cell|undefined}
   */
  cellAt(row, col) {
    if (row >= this.data.length || col >= this.data[row].length) return

    const index = row * this.data.length + col
    if (!this.cells[index]) this.cells[index] = new Cell(this, row, col)

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
   * @param {Grid} grid
   * @param {Number} row
   * @param {Number} col
   */
  constructor(grid, row, col) {
    this.grid = grid
    this.row = row
    this.col = col
    this.hits = {
      [HORIZONTAL]: null,
      [VERTICAL]: null
    }
  }

  get value() {
    return this.grid.valueAt(this.row, this.col)
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
   * Each cell's total hits number is equal to sum of robots
   * it could hit in its row and its column.
   *
   * @returns {Number}
   */
  get totalHits() {
    if (this.isWall) return 0
    if (this.hits[HORIZONTAL] === null) this.explore(HORIZONTAL)
    if (this.hits[VERTICAL] === null) this.explore(VERTICAL)

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
    let hitCount = 0
    const stack = [this]
    const emptyCells = []

    while (stack.length) {
      const cell = stack.pop()
      if (cell.isEmpty) emptyCells.push(cell)
      if (cell.isRobot) {
        cell.hits[direction] = 0
        hitCount++
      }

      const neighbor = cell.neighbor(direction)
      if (neighbor) stack.push(neighbor)
    }

    for (const cell of emptyCells) {
      cell.hits[direction] = hitCount
    }
  }

  /**
   * Get this cell's available neighbor in given direction, if it has one.
   *
   * @param {Symbol} direction
   * @returns {Cell}
   */
  neighbor(direction) {
    const cell = this.grid.cellAt(
      direction === HORIZONTAL ? this.row : this.row + 1,
      direction === HORIZONTAL ? this.col + 1 : this.col
    )

    if (cell && !cell.isWall) return cell
  }
}
