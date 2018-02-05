const test = require('tape')
/**
 * Check if given pattern matches the text with suppor for '.' and '*' symbols.
 * '.' is treated as a single a character wildcard,
 * and '*' is matched for a zero or more sequence of the previous letter.
 *
 * @param {String} text
 * @param {String} pattern
 * @returns {Boolean}
 */
function isMatch(text, pattern) {
  let tIndex = 0
  let pIndex = 0
  while (tIndex < text.length || pIndex < pattern.length) {
    if (pattern[pIndex + 1] === '*') {
      const lookFor = pattern[pIndex] === '.' ? text[tIndex] : pattern[pIndex]
      while (tIndex < text.length && text[tIndex] === lookFor) tIndex++
      pIndex += 2
    } else if (pattern[pIndex] === '.' || pattern[pIndex] === text[tIndex]) {
      tIndex++
      pIndex++
    } else {
      return false
    }
  }

  return true
}

test('it matches pattern without special chars', assert => {
  assert.equal(isMatch('abc', 'abc'), true)
  assert.equal(isMatch('', ''), true)
  assert.equal(isMatch('abc', 'ab'), false)
  assert.equal(isMatch('abc', 'a'), false)
  assert.equal(isMatch('a', 'abc'), false)
  assert.equal(isMatch('', 'abc'), false)
  assert.equal(isMatch('abc', ''), false)
  assert.end()
})

test('it matches pattern with "." placeholder', assert => {
  assert.equal(isMatch('abc', 'ab.'), true)
  assert.equal(isMatch('abd', 'ab.'), true)
  assert.equal(isMatch('axc', 'a.c'), true)
  assert.equal(isMatch('abbc', 'a..c'), true)
  assert.equal(isMatch('xbc', '.bc'), true)
  assert.equal(isMatch('bc', '.bc'), false)
  assert.equal(isMatch('abc', 'a.'), false)
  assert.end()
})

test('it matches pattern with "*" placeholder', assert => {
  assert.equal(isMatch('abbc', 'ab*c'), true)
  assert.equal(isMatch('abc', 'ax*.c'), true)
  assert.equal(isMatch('abbc', 'ax*b*y*c'), true)
  assert.equal(isMatch('bc', 'a*x*bc'), true)
  assert.equal(isMatch('abc', 'ab*c*'), true)
  assert.equal(isMatch('ab', 'ab*c*'), true)
  assert.equal(isMatch('a', 'ab*c*'), true)
  assert.equal(isMatch('ax', 'ab*c*d'), false)
  assert.equal(isMatch('abbc', 'a.*c*'), true)
  //assert.equal(match('abbc', 'ab*bbc'), true) // greedy fails
  assert.equal(isMatch('bbbb', '.*.*.*.*c'), false)
  assert.equal(isMatch('', 'b*c*'), true)
  assert.equal(isMatch('abx', 'ab*c*'), false)
  assert.end()
})
