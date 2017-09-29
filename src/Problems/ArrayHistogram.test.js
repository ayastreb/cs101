const test = require('tape')
const histogram = require('./ArrayHistogram')

test('draw diagram', assert => {
  const expected = [
    '*     ',
    '**  * ',
    '** ** ',
    '** ** ',
    '** ***',
    '******'
  ].join('\n')

  assert.equal(histogram([5, 4, 0, 3, 4, 1]), expected)
  assert.end()
})
