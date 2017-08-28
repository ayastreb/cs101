const test = require('tape')
const detectLoopStart = require('./DetectLoopInLinkedList')

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
