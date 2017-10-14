const test = require('tape')
const sub = require('./AllSubstrings')

test('generate all substrings', assert => {
  assert.deepEqual(sub('abc'), ['a', 'ab', 'abc', 'b', 'bc', 'c'])
  assert.deepEqual(sub('abcd'), [
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
