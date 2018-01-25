const test = require('tape')
const findBombPlace = require('./Bomberman')

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
