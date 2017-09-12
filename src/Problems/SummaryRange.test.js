const test = require('tape')
const range = require('./SummaryRange')

test('handle single element', assert => {
  assert.deepEqual(range([2]), ['2'])
  assert.end()
})

test('handle multiple ranges, no duplicagtes', assert => {
  assert.deepEqual(range([0, 1, 2, 4, 5, 7]), ['0->2', '4->5', '7'])
  assert.deepEqual(range([0, 2, 3, 4, 6, 8, 9]), ['0', '2->4', '6', '8->9'])
  assert.end()
})

test('handle multiple ranges, with duplicagtes', assert => {
  assert.deepEqual(range([1, 1, 2, 3, 4, 5, 5, 7]), ['1->5', '7'])
  assert.deepEqual(range([0, 2, 2, 3, 4, 8, 9]), ['0', '2->4', '8->9'])
  assert.end()
})

test('handle multiple ranges, with negatives', assert => {
  assert.deepEqual(range([-2, -1, 0, 1, 5, 6, 7]), ['-2->1', '5->7'])
  assert.deepEqual(range([-5, -2, -1, 1, 2, 3]), ['-5', '-2->-1', '1->3'])
  assert.end()
})
