const createSinglyLinkedList = require('./SinglyLinkedList')
/**
 * Queue is a first in first out (FIFO) abstract data type (opposite to Stack).
 * The first element added to the queue will be the first one to be removed.
 *
 * Application:
 * Queues are used to process buffers and events.
 *
 * Usage:
 * const createQueue = require('./Queue')
 * const queue = createQueue([ 'A', 'B', 'C' ]) // queue = A->B->C
 * queue.peek() // => 'A', queue = A->B->C
 * queue.enqueue('D') // queue = A->B->C->D
 * queue.dequeue() // => 'A', queue = B->C->D
 * queue.dequeue() // => 'B', queue = C->D
 * queue.size() // => 2, queue = C->D
 * queue.dequeue() // => 'C', queue = D
 * queue.dequeue() // => 'D', queue = null
 * queue.dequeue() // throws RangeError when trying to dequeue empty queue
 *
 * @param {Array} input initial queue data
 */
module.exports = (input = []) => {
  const list = createSinglyLinkedList()

  initialize(input)
  /** Public interface */
  return {
    size,
    peek,
    enqueue,
    dequeue
  }

  /**
   * Add all elements of given array to the queue.
   *
   * Performance: O(n)
   * @param {Array} input initial queue data
   */
  function initialize (input) {
    input.forEach(enqueue)
  }

  /**
   * Get current queue size.
   *
   * Performance: O(1)
   * @returns {number}
   */
  function size () {
    return list.size()
  }

  /**
   * Return value of the front element without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function peek () {
    return list.showFirst()
  }

  /**
   * Add new item to the queue.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function enqueue (item) {
    list.addLast(item)
  }

  /**
   * Remove and return first item in the queue.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function dequeue () {
    if (list.size() === 0) throw RangeError("Can't dequeue empty queue.")
    return list.removeFirst()
  }
}
