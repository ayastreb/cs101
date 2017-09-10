const test = require('tape')
const uniqueSubstrLength = require('./LongestUniqueSubstrLength')

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
