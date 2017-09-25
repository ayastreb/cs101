const test = require('tape')
const bubbleSort = require('./BubbleSort')
const selectionSort = require('./SelectionSort')
const insertionSort = require('./InsertionSort')
const mergeSort = require('./MergeSort')

testSuite(bubbleSort)
testSuite(selectionSort)
testSuite(insertionSort)
testSuite(mergeSort)

function testSuite(method) {
  test(`${method.name}: sorting random input`, assert => {
    assert.deepEqual(method([3, -3, 5, 18, 2, 23, 2]), [-3, 2, 2, 3, 5, 18, 23])
    assert.end()
  })

  test(`${method.name}: sorting sorted input`, assert => {
    assert.deepEqual(method([-5, 0, 2, 2, 4, 8]), [-5, 0, 2, 2, 4, 8])
    assert.deepEqual(method([8, 4, 2, 2, 0, -5]), [-5, 0, 2, 2, 4, 8])
    assert.end()
  })
}
