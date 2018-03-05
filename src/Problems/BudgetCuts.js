const test = require('tape')
/**
 * The awards committee of your alma mater (i.e. your college/university) asked
 * for your assistance with a budget allocation problem they’re facing.
 * Originally, the committee planned to give N research grants this year.
 * However, due to spending cutbacks, the budget was reduced to newBudget dollars
 * and now they need to reallocate the grants. The committee made a decision
 * that they’d like to impact as few grant recipients as possible by
 * applying a maximum cap on all grants. Every grant initially planned to be
 * higher than cap will now be exactly cap dollars.
 * Grants less or equal to cap, obviously, won’t be impacted.
 *
 * Given an array `grants` of the original grants and the reduced budget `maxBudget`,
 * write a function that finds in the most efficient manner a cap
 * such that the least number of recipients is impacted and
 * that the new budget constraint is met (i.e. sum of the N reallocated grants equals to maxBudget).
 *
 * Example:
 * input:  grants = [2, 100, 50, 120, 1000], maxBudget = 190
 *
 * output: 47 # and given this cap the new grants array would be
              # [2, 47, 47, 47, 47]. Notice that the sum of the new grants is indeed 190
 * @param {Array} grants
 * @param {Number} maxBudget
 * @returns {Number}
 */
function findGrantsCap(grants, maxBudget) {
  grants.sort((a, b) => a - b)
  let leftSum = 0

  for (let i = 0; i < grants.length; i++) {
    const rightLength = grants.length - i
    const rightSum = grants[i] * rightLength
    if (leftSum + rightSum > maxBudget) {
      return (maxBudget - leftSum) / rightLength
    }
    leftSum += grants[i]
  }

  return grants[grants.length - 1]
}

test('it finds cap for given grants', assert => {
  assert.equal(findGrantsCap([2, 4], 3), 1.5)
  assert.equal(findGrantsCap([2, 4, 6], 3), 1)
  assert.equal(findGrantsCap([2, 100, 50, 120, 167], 400), 128)
  assert.equal(findGrantsCap([2, 100, 50, 120, 1000], 190), 47)
  assert.equal(findGrantsCap([21, 100, 50, 120, 130, 110], 140), 23.8)
  // prettier-ignore
  assert.equal(findGrantsCap([210, 200, 150, 193, 130, 110, 209, 342, 117], 1530), 211)
  assert.end()
})
