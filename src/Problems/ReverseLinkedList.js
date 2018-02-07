const test = require('tape')
/**
 * Given a head of linked list we need to return reversed list.
 *
 * @param {Object} head { next: Object|null, prev: Object|null }
 */
function reverseIterative(head) {
  let prev = null
  while (head) {
    let next = head.next
    head.next = prev
    prev = head
    head = next
  }

  return prev
}

/**
 * Given a head of linked list we need to return reversed list.
 *
 * @param {Object} head { next: Object|null, prev: Object|null }
 */
function reverseRecursive(head, prev = null) {
  if (head === null) return prev

  let next = head.next
  head.next = prev
  return reverseRecursive(next, head)
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
  list = reverseRecursive(list)
  assert.equal(toString(list), '->D->C->B->A')
  list = reverseIterative(list)
  assert.equal(toString(list), '->A->B->C->D')
  assert.end()
})

function toString(head) {
  let string = ''
  let current = head
  while (current) {
    string += `->${current.data}`
    current = current.next
  }
  return string
}
