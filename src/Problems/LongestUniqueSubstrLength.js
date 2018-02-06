const test = require('tape')
/**
 * Given a string, return the length of longest unique substring in it.
 *
 * @param {String} input
 * @returns {Number}
 */
function uniqueSubstrLength(input) {
  const map = {}
  let start = 0
  let length = 0

  for (let index = 0; index < input.length; index++) {
    if (map[input[index]] >= start) {
      start = map[input[index]] + 1
    } else {
      length = Math.max(length, index - start + 1)
    }
    map[input[index]] = index
  }

  return length
}

test('count longest unique char substring length', assert => {
  assert.equal(uniqueSubstrLength(''), 0)
  assert.equal(uniqueSubstrLength('a'), 1)
  assert.equal(uniqueSubstrLength('bbbb'), 1)
  assert.equal(uniqueSubstrLength('abc'), 3)
  assert.equal(uniqueSubstrLength('dvdf'), 3)
  assert.equal(uniqueSubstrLength('abcabcbb'), 3)
  assert.equal(uniqueSubstrLength('pwwkew'), 3)
  assert.equal(uniqueSubstrLength('abcaabcdebb'), 5)
  assert.end()
})
