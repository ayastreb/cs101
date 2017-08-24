const test = require('tape')
const reverse = require('./ReverseLinkedList')

const toString = head => {
  let string = ''
  let current = head
  while (current) {
    string += `->${current.data}`
    current = current.next
  }
  return string
}

test('it reverses given list', assert => {
  let list = {
    data: 'A',
    next: {
      data: 'B',
      next: {
        data: 'C',
        next: {
          data: 'D',
          next: null
        }
      }
    }
  }
  assert.equal(toString(list), '->A->B->C->D')
  list = reverse.recursive(list)
  assert.equal(toString(list), '->D->C->B->A')
  list = reverse.iterative(list)
  assert.equal(toString(list), '->A->B->C->D')
  assert.end()
})
