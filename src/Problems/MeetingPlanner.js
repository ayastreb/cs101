const test = require('tape')
/**
 * Given the availability, `slotsA` and `slotsB`, of two people and a meeting duration `dur`,
 * return the earliest time slot that works for both of them and is of duration dur.
 * If there is no common time slot that satisfies the duration requirement, return empty slot.
 *
 * Examples:
 * input:  slotsA = [[10, 50], [60, 120], [140, 210]]
 *         slotsB = [[0, 15], [60, 70]]
 *         dur = 8
 * output: [60, 68]
 *
 * Solution approach:
 *
 * Maintain two pointers to iterate each person's slots from the beginning.
 * At each step check if two current slots overlap and fit meeting duration.
 * If slots don't overlap or fit the meeting, move pointer of the person with
 * earliest end of slot one step ahead and check again.
 * Stop when slot is found or reached end of either of the lists.
 *
 * @param {Array} slotsA
 * @param {Array} slotsB
 * @param {Number} dur
 * @returns {Array}
 */
function meetingPlanner(slotsA, slotsB, dur) {
  let pointerA = 0
  let pointerB = 0

  while (pointerA < slotsA.length && pointerB < slotsB.length) {
    const start = Math.max(slotsA[pointerA][0], slotsB[pointerB][0])
    const end = Math.min(slotsA[pointerA][1], slotsB[pointerB][1])
    if (start + dur <= end) {
      return [start, start + dur]
    }

    if (slotsA[pointerA][1] < slotsB[pointerB][1]) {
      pointerA++
    } else {
      pointerB++
    }
  }

  return []
}

test('finds slot for a meeting', assert => {
  const slotsA = [[10, 50], [60, 120], [140, 210]]
  const slotsB = [[0, 15], [60, 70]]
  const dur = 8
  assert.deepEqual(meetingPlanner(slotsA, slotsB, dur), [60, 68])
  assert.end()
})

test('finds no slot for a meeting', assert => {
  const slotsA = [[10, 50], [60, 120], [140, 210]]
  const slotsB = [[0, 15], [60, 70]]
  const dur = 12
  assert.deepEqual(meetingPlanner(slotsA, slotsB, dur), [])
  assert.end()
})

test('single element in both lists', assert => {
  const slotsA = [[10, 50]]
  const slotsB = [[40, 45]]
  const dur = 5
  assert.deepEqual(meetingPlanner(slotsA, slotsB, dur), [40, 45])
  assert.end()
})
