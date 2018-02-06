const test = require('tape')
/**
 * Check if given linked list is a plaindrome.
 *
 * @param {Object} head { next: Object, data: any }
 */
function isPalindrome(head) {
  let fast = head
  let slow = head
  const stack = []

  while (fast && fast.next) {
    stack.push(slow.data)
    slow = slow.next
    fast = fast.next.next
  }
  // odd-length linked list
  if (fast) slow = slow.next

  while (slow) {
    if (stack.pop() !== slow.data) return false
    slow = slow.next
  }

  return true
}

test('it validates non-palindrome', assert => {
  // list = A->B->C
  const list = {
    data: 'A',
    next: {
      data: 'B',
      next: {
        data: 'C',
        next: null
      }
    }
  }
  assert.equal(isPalindrome(list), false)
  assert.end()
})

test('it validates even-length palindrome linked list', assert => {
  // list = A->B->C->C->B->A
  const list = {
    data: 'A',
    next: {
      data: 'B',
      next: {
        data: 'C',
        next: {
          data: 'C',
          next: {
            data: 'B',
            next: {
              data: 'A',
              next: null
            }
          }
        }
      }
    }
  }
  assert.equal(isPalindrome(list), true)
  assert.end()
})

test('it validates odd-length palindrome linked list', assert => {
  // list = A->B->X->B->A
  const list = {
    data: 'A',
    next: {
      data: 'B',
      next: {
        data: 'X',
        next: {
          data: 'B',
          next: {
            data: 'A',
            next: null
          }
        }
      }
    }
  }
  assert.equal(isPalindrome(list), true)

  const singleNodeList = {
    data: 'A',
    next: null
  }
  assert.equal(isPalindrome(singleNodeList), true)
  assert.end()
})
