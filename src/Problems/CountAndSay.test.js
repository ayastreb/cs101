const test = require('tape')
const count = require('./CountAndSay')

test('it counts digits in the string', assert => {
  assert.equal(count(1), '1')
  assert.equal(count(2), '11')
  assert.equal(count(3), '21')
  assert.equal(count(4), '1211')
  assert.equal(count(5), '111221')
  assert.equal(count(6), '312211')
  assert.equal(count(7), '13112221')
  assert.equal(count(8), '1113213211')
  assert.equal(count(9), '31131211131221')
  assert.equal(count(10), '13211311123113112211')
  assert.end()
})