const test = require('tape')
/**
 * Check if given sudoku board is solvable.
 * Board is represented by 9x9 matrix, where empty cell is represented with "."
 * See https://en.wikipedia.org/wiki/Sudoku for rules and examples.
 *
 * Solution approach:
 * We can use backtracking to check all possible placements of numbers on the board.
 * With each step we choose next cell to fill in, trying to minimize the amount
 * of possible candidates, e.g. we choose a cell with the smallest amount of candidates
 * (numbers that could be placed in the cell without violating any rules).
 * After we find this cell we try to fill in the first candidate
 * and recursievly proceed to the next step with a board wich has -1 empty cell.
 * If our first candidate does not lead to solution (e.g. there are empty cells
 * which have no candidates) - we backtrack and try to solve it with next candidate.
 *
 * @param {Array} board
 * @returns {Boolean}
 */
function solveSudoku(board) {
  const EMPTY = '.'
  const BLOCK_SIZE = Math.sqrt(board.length)
  const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const cell = nextEmptyCell()
  // if there are no empty cells - the board is solved
  if (!cell) return true

  for (const candidate of cell.candidates) {
    board[cell.row][cell.col] = candidate
    if (solveSudoku(board)) return true
  }

  // we iterated through all candidates and none of them led to solution,
  // which means we need to backtrack and revert cell's value back to empty
  board[cell.row][cell.col] = EMPTY
  return false

  /**
   * Find a cell that has minimum amount of possible candidates.
   *
   * @returns {Object|Boolean} false, if no empty cells left on the board
   */
  function nextEmptyCell() {
    let next
    for (let id = 0; id < board.length; id++) {
      const blockCandidates = new Set(NUMS)
      for (const cell of blockCells(id)) {
        if (cell.value !== EMPTY) blockCandidates.delete(cell.value)
      }
      if (blockCandidates.size === 0) continue

      for (const cell of blockCells(id)) {
        if (cell.value !== EMPTY) continue
        const candidates = cellCandidates(cell, blockCandidates)
        if (!next || candidates.size < next.candidates.size) {
          next = { row: cell.row, col: cell.col, candidates }
        }
      }
    }

    return next
  }

  /**
   * Sudoku board is divided in 9 sub-boards (3x3 blocks).
   * We can give each block an ID from 0 to 8 and iterate each block separately.
   * For example:
   * block #0 has cells in rows 0,1,2 and columns 0,1,2
   * block #1 has cells in rows 0,1,2 and columns 3,4,5
   * block #7 has cells in rows 6,7,8 and columns 3,4,5
   * etc...
   *
   *  | 0 1 2 | 3 4 5 | 6 7 8 |
   * -┼-------┼-------┼-------┼
   * 0|       |       |       |
   * 1|   0   |   1   |   2   |
   * 2|       |       |       |
   * -┼-------┼-------┼-------┼
   * 3|       |       |       |
   * 4|   3   |   4   |   5   |
   * 5|       |       |       |
   * -┼-------┼-------┼-------┼
   * 6|       |       |       |
   * 7|   6   |   7   |   8   |
   * 8|       |       |       |
   * -┼-------┼-------┼-------┼
   *
   * @param {Number} id
   * @returns {Array}
   */
  function blockCells(id) {
    const cells = []
    const rowStart = Math.floor(id / BLOCK_SIZE) * BLOCK_SIZE
    for (let row = rowStart; row < rowStart + BLOCK_SIZE; row++) {
      const colStart = (id % BLOCK_SIZE) * BLOCK_SIZE
      for (let col = colStart; col < colStart + BLOCK_SIZE; col++) {
        cells.push({ row, col, value: board[row][col] })
      }
    }

    return cells
  }

  /**
   * Get a list of possible candidates for given cell based on possible
   * candidates for cell's block: walk through cell's row and column and remove
   * numbers that are already in the block.
   *
   * @param {Object} cell { row: Number, col: Number, value: String }
   * @param {Set} blockCandidates
   * @returns {Set}
   */
  function cellCandidates(cell, blockCandidates) {
    const candidates = new Set(blockCandidates)
    for (let i = 0; i < board.length; i++) {
      candidates.delete(board[cell.row][i])
      candidates.delete(board[i][cell.col])
    }

    return candidates
  }
}

test('finds solution I', assert => {
  const inp = [
    ['.', '.', '.', '7', '.', '.', '3', '.', '1'],
    ['3', '.', '.', '9', '.', '.', '.', '.', '.'],
    ['.', '4', '.', '3', '1', '.', '2', '.', '.'],
    ['.', '6', '.', '4', '.', '.', '5', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '1', '.', '.', '8', '.', '4', '.'],
    ['.', '.', '6', '.', '2', '1', '.', '5', '.'],
    ['.', '.', '.', '.', '.', '9', '.', '.', '8'],
    ['8', '.', '5', '.', '.', '4', '.', '.', '.']
  ]
  assert.equal(solveSudoku(inp), true)
  assert.end()
})

test('finds solution II', assert => {
  const inp = [
    ['.', '.', '5', '.', '.', '2', '.', '.', '.'],
    ['.', '.', '9', '.', '4', '7', '.', '2', '.'],
    ['.', '.', '8', '.', '5', '6', '.', '.', '1'],
    ['.', '.', '.', '.', '.', '8', '3', '4', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
    ['.', '.', '.', '.', '3', '.', '1', '8', '.'],
    ['.', '2', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '9', '.', '.', '8', '.', '6', '7', '.'],
    ['3', '.', '6', '5', '7', '.', '.', '.', '.']
  ]
  assert.equal(solveSudoku(inp), true)
  assert.end()
})

test('finds solution III', assert => {
  const inp = [
    ['.', '.', '3', '8', '.', '.', '4', '.', '.'],
    ['.', '.', '.', '.', '1', '.', '.', '7', '.'],
    ['.', '6', '.', '.', '.', '5', '.', '.', '9'],
    ['.', '.', '.', '9', '.', '.', '6', '.', '.'],
    ['.', '2', '.', '.', '.', '.', '.', '1', '.'],
    ['.', '.', '4', '.', '.', '3', '.', '.', '2'],
    ['.', '.', '2', '.', '.', '.', '8', '.', '.'],
    ['.', '1', '.', '.', '.', '.', '.', '5', '.'],
    ['9', '.', '.', '.', '.', '7', '.', '.', '3']
  ]
  assert.equal(solveSudoku(inp), true)
  assert.end()
})

test('finds solution IV', assert => {
  const inp = [
    ['.', '.', '8', '.', '2', '.', '.', '.', '5'],
    ['.', '.', '.', '.', '9', '.', '.', '.', '.'],
    ['.', '5', '.', '3', '.', '.', '.', '1', '.'],
    ['2', '.', '.', '1', '.', '6', '.', '.', '.'],
    ['.', '3', '6', '.', '.', '.', '.', '8', '.'],
    ['.', '.', '.', '.', '.', '7', '6', '.', '9'],
    ['4', '2', '.', '.', '.', '.', '.', '.', '8'],
    ['.', '.', '.', '.', '.', '.', '9', '.', '1'],
    ['.', '.', '5', '.', '4', '3', '.', '.', '.']
  ]
  assert.equal(solveSudoku(inp), true)
  assert.end()
})

test('no solution', assert => {
  const inp = [
    ['.', '8', '9', '.', '4', '.', '6', '.', '5'],
    ['.', '7', '.', '.', '.', '8', '.', '4', '1'],
    ['5', '6', '.', '9', '.', '.', '.', '.', '8'],
    ['.', '.', '.', '7', '.', '5', '.', '9', '.'],
    ['.', '9', '.', '4', '.', '1', '.', '5', '.'],
    ['.', '3', '.', '9', '.', '6', '.', '1', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '7'],
    ['.', '2', '.', '8', '.', '.', '.', '6', '.'],
    ['.', '.', '6', '.', '7', '.', '.', '8', '.']
  ]
  assert.equal(solveSudoku(inp), false)
  assert.end()
})

test('no solution', assert => {
  const inp = [
    ['.', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.']
  ]
  assert.equal(solveSudoku(inp), false)
  assert.end()
})
