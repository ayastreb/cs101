const test = require('tape')
const find = require('./LongestWordInDict')

test('it returns empty string if no word is a subsequence of input string', assert => {
  const input = 'pplelea'
  const dict = ['able', 'ale', 'apple', 'bale', 'kangaroo']
  assert.equal(find(input, dict), '')
  assert.end()
})

test('it finds longest word that is a subsequence of input string', assert => {
  const input = 'abpplele'
  const dict = ['able', 'ale', 'apple', 'bale', 'kangaroo']
  assert.equal(find(input, dict), 'apple')
  assert.end()
})
