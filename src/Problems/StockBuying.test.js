const test = require('tape')
const maxProfit = require('./StockBuying')

test('it returns 0 for 1 price', assert => {
  assert.equal(maxProfit([]), 0)
  assert.equal(maxProfit([10]), 0)
  assert.end()
})

test('it returns 0 for descending prices', assert => {
  assert.equal(maxProfit([5, 4, 3, 2, 1]), 0)
  assert.end()
})

test('it returns max profit for given days', assert => {
  assert.equal(maxProfit([7, 1, 5, 3, 6]), 5) // max profit = 6 - 1 = 5
  assert.equal(maxProfit([10, 2, 6, 8, 1]), 6) // max profit = 8 - 2 = 6
  assert.end()
})
