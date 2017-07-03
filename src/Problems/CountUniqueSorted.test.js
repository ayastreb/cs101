const test = require('tape')
const countUnique = require('./CountUniqueSorted')

test('it counts zero items', assert => {
  assert.equal(countUnique([]), 0)
  assert.end()
})

test('it counts single item', assert => {
  assert.equal(countUnique([5]), 1)
  assert.end()
})

test('it counts single unique item', assert => {
  assert.equal(countUnique([5, 5, 5]), 1)
  assert.end()
})

test('it counts multiple items', assert => {
  assert.equal(countUnique([1, 3, 3, 5]), 3)
  assert.equal(countUnique([1, 3, 3, 4, 5, 5, 5]), 4)
  assert.end()
})

test('it counts long list of items', assert => {
  const input = []
  const n = 1000
  // generate n^2 input array
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      input.push(i)
    }
  }
  assert.equal(countUnique(input), n)
  assert.end()
})
