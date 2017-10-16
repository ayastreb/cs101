/**
 * Given a set of non-overlapping intervals,
 * insert a new interval into the intervals (merge if necessary).
 *
 * @param {array} intervals
 * @param {object} newIntrvl
 * @return {array} new list with inserted interval
 */
module.exports = (intervals, newIntrvl) => {
  const n = intervals.length
  if (n === 0) return [newIntrvl]
  if (newIntrvl.start > intervals[n - 1].end) return [...intervals, newIntrvl]

  const result = []
  for (let i = 0; i < n; i++) {
    if (newIntrvl.end < intervals[i].start) {
      result.push(newIntrvl)
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
