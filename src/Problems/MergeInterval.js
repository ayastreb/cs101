const test = require('tape')
/**
 * Given a set of non-overlapping intervals,
 * insert a new interval into the intervals (merge if necessary).
 *
 * @param {array} intervals
 * @param {object} newIntrvl
 * @return {array} new list with inserted interval
 */
function mergeInterval(intervals, newIntrvl) {
  const n = intervals.length
  if (n === 0) return [newIntrvl]
  if (newIntrvl.start > intervals[n - 1].end) return [...intervals, newIntrvl]

  const result = []
  for (let i = 0; i < n; i++) {
    if (newIntrvl.end < intervals[i].start) {
      result.push(newIntrvl, ...intervals.slice(i))
      break
    }
    if (!isOverlapping(intervals[i], newIntrvl)) {
      result.push(intervals[i])
    } else {
      const start = Math.min(intervals[i].start, newIntrvl.start)
      // look ahead until either next non-overlapping interval or the end
      while (i + 1 < n && isOverlapping(intervals[i + 1], newIntrvl)) i++
      const end = Math.max(intervals[i].end, newIntrvl.end)
      // add new merged interval and the rest of the list
      result.push({ start, end }, ...intervals.slice(i + 1))
      break
    }
  }

  return result
}

function isOverlapping(A, B) {
  return Math.max(A.start, B.start) < Math.min(A.end, B.end)
}

test('it merges into empty list', assert => {
  assert.deepEqual(mergeInterval([], { start: 2, end: 5 }), [
    { start: 2, end: 5 }
  ])
  assert.end()
})

test('new interval ends before first', assert => {
  assert.deepEqual(
    mergeInterval([{ start: 5, end: 7 }, { start: 8, end: 10 }], {
      start: 1,
      end: 4
    }),
    [{ start: 1, end: 4 }, { start: 5, end: 7 }, { start: 8, end: 10 }]
  )
  assert.end()
})

test('new interval start after last', assert => {
  assert.deepEqual(
    mergeInterval([{ start: 5, end: 7 }], { start: 8, end: 9 }),
    [{ start: 5, end: 7 }, { start: 8, end: 9 }]
  )
  assert.end()
})

test('new interval does not overlap', assert => {
  assert.deepEqual(
    mergeInterval(
      [
        { start: 3, end: 5 },
        { start: 8, end: 10 },
        { start: 14, end: 15 },
        { start: 16, end: 17 }
      ],
      { start: 11, end: 13 }
    ),
    [
      { start: 3, end: 5 },
      { start: 8, end: 10 },
      { start: 11, end: 13 },
      { start: 14, end: 15 },
      { start: 16, end: 17 }
    ]
  )
  assert.end()
})

test('new interval overlaps one interval', assert => {
  assert.deepEqual(
    mergeInterval(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 4, end: 7 }
    ),
    [{ start: 3, end: 7 }, { start: 8, end: 10 }, { start: 14, end: 15 }]
  )
  assert.end()
})

test('new interval overlaps middle interval', assert => {
  assert.deepEqual(
    mergeInterval(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 4, end: 12 }
    ),
    [{ start: 3, end: 12 }, { start: 14, end: 15 }]
  )
  assert.end()
})

test('new interval overlaps last interval', assert => {
  assert.deepEqual(
    mergeInterval(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 9, end: 17 }
    ),
    [{ start: 3, end: 5 }, { start: 8, end: 17 }]
  )
  assert.deepEqual(
    mergeInterval(
      [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 15 }],
      { start: 14, end: 17 }
    ),
    [{ start: 3, end: 5 }, { start: 8, end: 10 }, { start: 14, end: 17 }]
  )
  assert.end()
})
