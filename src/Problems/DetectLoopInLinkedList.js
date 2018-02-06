const test = require('tape')
/**
 * Given a head of linked list we need to find if there's a loop, and if so
 * return the node where loop starts.
 *
 * This problem can be solved using Floyd's (tortoise & hare) cycle-finding algorithm.
 */
function detectLoopStart(head) {
  let slow = head
  let fast = head
  let hasLoop = false

  while (slow && fast && fast.next && !hasLoop) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      hasLoop = true
    }
  }

  if (!hasLoop) return null

  slow = head
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow
}

test('it returns null if there is no loop', assert => {
  // list = A->B->C->D
  const head = {
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

  assert.equal(detectLoopStart(head), null)
  assert.end()
})

test('it detects loop start', assert => {
  // list = A->B->C->D
  const head = {
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
  // create loop D -> B, so it becomes A->B->C->D->B->C->D->...
  const nodeB = head.next
  const nodeD = head.next.next.next
  nodeD.next = nodeB

  const loopStart = detectLoopStart(head)
  assert.equal(loopStart.data, 'B')
  assert.end()
})
