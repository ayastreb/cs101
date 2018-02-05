const test = require('tape')
/**
 * Return all substrings of given string.
 *
 * @param {String} input
 * @returns {Array}
 */
function allSubstrings(input) {
  const sub = []
  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j <= input.length - i; j++) {
      sub.push(input.substr(i, j))
    }
  }
  return sub
}

test('generate all substrings', assert => {
  assert.deepEqual(allSubstrings('abc'), ['a', 'ab', 'abc', 'b', 'bc', 'c'])
  assert.deepEqual(allSubstrings('abcd'), [
    'a',
    'ab',
    'abc',
    'abcd',
    'b',
    'bc',
    'bcd',
    'c',
    'cd',
    'd'
  ])
  assert.end()
})
