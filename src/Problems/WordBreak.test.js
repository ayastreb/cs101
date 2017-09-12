const test = require('tape')
const breaker = require('./WordBreak')

test('return null if not found', assert => {
  const string = 'applepie'
  const dict = new Set(['orange', 'apple', 'cookie'])
  assert.equal(breaker(string, dict), null)
  assert.end()
})

test('break one word', assert => {
  const string = 'apple'
  const dict = new Set(['orange', 'apple', 'banana'])
  assert.equal(breaker(string, dict), 'apple')
  assert.end()
})

test('break two words', assert => {
  const string = 'applepie'
  const dict = new Set(['apple', 'banana', 'pie'])
  assert.equal(breaker(string, dict), 'apple pie')
  assert.end()
})

test('break mulptiple words', assert => {
  const string = 'peanutbutterjelly'
  const dict = new Set(['apple', 'butter', 'jelly', 'peanut'])
  assert.equal(breaker(string, dict), 'peanut butter jelly')
  assert.end()
})

test('backrtacking issue', assert => {
  const string = 'aaaaaaab'
  const dict = new Set(['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa'])
  assert.equal(breaker(string, dict), null)
  assert.end()
})
