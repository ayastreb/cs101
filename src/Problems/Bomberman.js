const test = require('tape')
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
function findBombPlace(input) {
  let maxHits = 0
  const grid = new Grid(input)
  for (const cell of grid) {
    maxHits = Math.max(maxHits, cell.totalHits)
  }

  return grid.cells
    .filter(cell => cell.totalHits > 0 && cell.totalHits === maxHits)
    .map(cell => `${cell.row}:${cell.col}`)
}

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

  *[Symbol.iterator]() {
    for (let row = 0; row < this.data.length; row++) {
      for (let col = 0; col < this.data[row].length; col++) {
        const cell = this.cellAt(row, col)
        if (cell) yield cell
      }
    }
  }

  /**
   * @param {Number} row
   * @param {Number} col
   * @returns {Cell|undefined}
   */
  cellAt(row, col) {
    if (
      row < this.data.length &&
      col < this.data[row].length &&
      this.data[row][col] !== WALL
    ) {
      const index = row * this.data.length + col
      if (!this.cells[index]) {
        const cell = new Cell(this.data[row][col] === ROBOT, row, col)
        cell.neighbor[HORIZONTAL] = this.cellAt(row, col + 1)
        cell.neighbor[VERTICAL] = this.cellAt(row + 1, col)
        this.cells[index] = cell
      }

      return this.cells[index]
    }
  }
}

class Cell {
  /**
   * @param {Boolean} isRobot
   * @param {Number} row
   * @param {Number} col
   */
  constructor(isRobot, row, col) {
    this.isRobot = isRobot
    this.row = row
    this.col = col
    this.neighbor = { HORIZONTAL, VERTICAL }
    this.hits = { HORIZONTAL, VERTICAL }
  }

  /**
   * Each cell's total hits number is equal to sum of robots it could hit in its row and its column.
   *
   * @returns {Number}
   */
  get totalHits() {
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
      if (cell.isRobot) {
        cell.hits[direction] = 0
        hitCount++
      } else {
        emptyCells.push(cell)
      }
      cell = cell.neighbor[direction]
    }

    for (const cell of emptyCells) {
      cell.hits[direction] = hitCount
    }
  }
}

test('it finds no place for a bomb', assert => {
  const field = [
    [2, 2, 1, 0, 0, 0],
    [2, 2, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
  // there are no empty cells where we could place a bomb which will hit a target
  assert.deepEqual(findBombPlace(field), [])
  assert.end()
})

test('it finds single best place for a bomb', assert => {
  const field = [
    [0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 2, 0],
    [0, 0, 1, 0, 0, 0],
    [2, 0, 0, 0, 0, 0]
  ]
  // signle best place is row #1, column #4 - it will hit 3 targets (1:1, 1:5, 3:4)
  assert.deepEqual(findBombPlace(field), ['1:4'])
  assert.end()
})

test('it finds multiple best places for a bomb', assert => {
  const field = [
    [0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 2, 0],
    [0, 0, 1, 0, 0, 0],
    [2, 2, 0, 0, 0, 0]
  ]
  // there are 4 places which will hit 3 targets
  assert.deepEqual(findBombPlace(field), ['1:4', '3:1', '5:4', '5:5'])
  assert.end()
})
