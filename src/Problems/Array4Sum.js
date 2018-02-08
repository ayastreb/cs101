const test = require('tape')
/**
 * Given an unsorted array of integers `arr` and a number `sum`,
 * find four numbers (quadruplet) in `arr` that sum up to `sum`.
 * Function should return an array of these numbers in an ascending order.
 * If such a quadruplet doesn’t exist, return an empty array.
 *
 * @param {Array} arr
 * @param {Number} sum
 * @returns {Array}
 */
function array4Sum(arr, sum) {
  const pairs = []
  for (let first = 0; first < arr.length; first++) {
    for (let second = first + 1; second < arr.length; second++) {
      pairs.push({ sum: arr[first] + arr[second], first, second })
    }
  }
  pairs.sort((a, b) => a.sum - b.sum)

  let left = 0
  let right = pairs.length - 1
  while (left < right) {
    const pairA = pairs[left]
    const pairB = pairs[right]
    const pairSum = pairA.sum + pairB.sum
    if (pairSum === sum && noCommon(pairA, pairB)) {
      return [
        arr[pairA.first],
        arr[pairA.second],
        arr[pairB.first],
        arr[pairB.second]
      ].sort((a, b) => a - b)
    } else if (pairSum < sum) {
      left++
    } else {
      right--
    }
  }

  return []

  /**
   * Check that pairs don't use the same element in `arr`.
   *
   * @param {Object} a
   * @param {Object} b
   */
  function noCommon(a, b) {
    return !(
      a.first === b.first ||
      a.first === b.second ||
      a.second === b.first ||
      a.second === b.second
    )
  }
}

test('lempty array', assert => {
  assert.deepEqual(array4Sum([], 10), [])
  assert.end()
})

test('less than 4 elements in array', assert => {
  assert.deepEqual(array4Sum([4, 4, 4], 12), [])
  assert.end()
})

test('it does not use same element multiple times', assert => {
  assert.deepEqual(array4Sum([4, 4, 4, 2], 16), [])
  assert.deepEqual(array4Sum([4, 4, 4, 4], 16), [4, 4, 4, 4])
  assert.end()
})

test('it finds 4-sum', assert => {
  assert.deepEqual(array4Sum([2, 7, 4, 0, 9, 5, 1, 3], 20), [0, 4, 7, 9])
  // prettier-ignore
  assert.deepEqual(array4Sum([1, 2, 3, 4, 5, 9, 19, 12, 12, 19], 40), [4, 5, 12, 19])
  assert.end()
})
