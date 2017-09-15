/**
 * Given a list of numbers representing stock price at each day,
 * find max possible profit.
 * Example:
 * given [7, 1, 5, 3, 6] the max profit is 5 - buy on 2nd day for 1 and sell on 5th day for 6.
 *
 * @param {array} prices
 */
module.exports = prices => {
  if (prices.length <= 1) return 0
  let minPrice = prices[0]
  let maxProfit = 0
  for (let day = 1; day < prices.length; day++) {
    minPrice = Math.min(minPrice, prices[day])
    maxProfit = Math.max(maxProfit, prices[day] - minPrice)
  }

  return maxProfit
}
