const test = require('tape')
const reverse = require('./ReverseLinkedList')
const createLinkedList = require('../DataStructures/SinglyLinkedList')

test('it reverses given list', assert => {
  const list = createLinkedList(['A', 'B', 'C', 'D'])
  assert.deepEqual([...list], ['A', 'B', 'C', 'D'])
  assert.deepEqual([...reverse(list)], ['D', 'C', 'B', 'A'])
  assert.end()
})
