const test = require('tape')
const countIslands = require('./CountIslands')

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
