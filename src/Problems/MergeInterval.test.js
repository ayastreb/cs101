const test = require('tape')
const merge = require('./MergeInterval')

test('it merges into empty list', assert => {
  assert.deepEqual(merge([], { start: 2, end: 5 }), [{ start: 2, end: 5 }])
  assert.end()
})

test('new interval ends before first', assert => {
  assert.deepEqual(merge([{ start: 5, end: 7 }], { start: 1, end: 4 }), [
    { start: 1, end: 4 },
    { start: 5, end: 7 }
  ])
  assert.end()
})

test('new interval start after last', assert => {
  assert.deepEqual(merge([{ start: 5, end: 7 }], { start: 8, end: 9 }), [
    { start: 5, end: 7 },
    { start: 8, end: 9 }
  ])
  assert.end()
})

test('new interval does not overlap', assert => {
  assert.deepEqual(
    merge(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 11, end: 13 }
    ),
    [
      { start: 3, end: 5 },
      { start: 8, end: 10 },
      { start: 11, end: 13 },
      { start: 14, end: 15 }
    ]
  )
  assert.end()
})

test('new interval overlaps one interval', assert => {
  assert.deepEqual(
    merge(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 4, end: 7 }
    ),
    [{ start: 3, end: 7 }, { start: 8, end: 10 }, { start: 14, end: 15 }]
  )
  assert.end()
})

test('new interval overlaps middle interval', assert => {
  assert.deepEqual(
    merge(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 4, end: 12 }
    ),
    [{ start: 3, end: 12 }, { start: 14, end: 15 }]
  )
  assert.end()
})

test('new interval overlaps last interval', assert => {
  assert.deepEqual(
    merge(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 9, end: 17 }
    ),
    [{ start: 3, end: 5 }, { start: 8, end: 17 }]
  )
  assert.deepEqual(
    merge(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 14, end: 17 }
    ),
    [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 17 }]
  )
  assert.end()
})
