const SinglyLinkedList = require('./SinglyLinkedList')
/**
 * Queue is a first in first out (FIFO) abstract data type (opposite to Stack).
 * The first element added to the queue will be the first one to be removed.
 *
 * Application:
 * Queues are used to process buffers and events.
 *
 * Usage:
 * const Queue = require('./Queue')
 * const queue = new Queue([ 'A', 'B', 'C' ]) // queue = A->B->C
 * queue.peek() // => 'A', queue = A->B->C
 * queue.enqueue('D') // queue = A->B->C->D
 * queue.dequeue() // => 'A', queue = B->C->D
 * queue.dequeue() // => 'B', queue = C->D
 * queue.size() // => 2, queue = C->D
 * queue.dequeue() // => 'C', queue = D
 * queue.dequeue() // => 'D', queue = null
 * queue.dequeue() // throws RangeError when trying to dequeue empty queue
 */
module.exports = class Queue {
  /**
   * Create queue.
   *
   * @param {Array} input initial queue data
   */
  constructor(input = []) {
    this.list = new SinglyLinkedList()

    for (const item of input) this.enqueue(item)
  }

  get length() {
    return this.list.length
  }

  /**
   * Return value of the front element without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  peek() {
    return this.list.first
  }

  /**
   * Add new item to the queue.
   *
   * Performance: O(1)
   * @param {*} item
   */
  enqueue(item) {
    this.list.addLast(item)
  }

  /**
   * Remove and return first item in the queue.
   *
   * Performance: O(1)
   * @returns {*}
   */
  dequeue() {
    if (this.list.length === 0) throw RangeError("Can't dequeue empty queue.")
    return this.list.removeFirst()
  }
}
