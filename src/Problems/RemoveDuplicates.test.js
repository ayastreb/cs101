const test = require('tape')
const {
  removeOneliner,
  removeWithLinearSpace,
  removeWithConstantSpace
} = require('./RemoveDuplicates')

runTestSuite('oneliner', removeOneliner)
runTestSuite('linear space', removeWithLinearSpace)
runTestSuite('constant space', removeWithConstantSpace)

function runTestSuite(name, fn) {
  test('removes duplicates from string', assert => {
    assert.equal(fn('aabcadbeefc'), 'abcdef')
    assert.equal(fn('abcdef'), 'abcdef')
    assert.end()
  })
}
