const test = require('tape')
const isPalindrome = require('./IsPalindromeLinkedList')

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
