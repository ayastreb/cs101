const test = require('tape')
/**
 * Given a list of numbers representing stock price at each day,
 * find max possible profit.
 * Example:
 * given [7, 1, 5, 3, 6] the max profit is 5 - buy on 2nd day for 1 and sell on 5th day for 6.
 *
 * @param {array} prices
 */
function buyStockSingleTransaction(prices) {
  if (prices.length <= 1) return 0
  let minPrice = prices[0]
  let maxProfit = 0
  for (let day = 1; day < prices.length; day++) {
    minPrice = Math.min(minPrice, prices[day])
    maxProfit = Math.max(maxProfit, prices[day] - minPrice)
  }

  return maxProfit
}

test('it returns 0 for 1 price', assert => {
  assert.equal(buyStockSingleTransaction([]), 0)
  assert.equal(buyStockSingleTransaction([10]), 0)
  assert.end()
})

test('it returns 0 for descending prices', assert => {
  assert.equal(buyStockSingleTransaction([5, 4, 3, 2, 1]), 0)
  assert.end()
})

test('it returns max profit for given days', assert => {
  assert.equal(buyStockSingleTransaction([7, 1, 5, 3, 6]), 5) // max profit = 6 - 1 = 5
  assert.equal(buyStockSingleTransaction([10, 2, 6, 8, 1]), 6) // max profit = 8 - 2 = 6
  assert.end()
})
