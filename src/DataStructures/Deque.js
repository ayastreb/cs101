const DoublyLinkedList = require('./DoublyLinkedList')
/**
 * Deque (double-ended queue, pronounced "deck") is a generalization of a queue
 * where elements can be added to or removed from either the front or the back.
 *
 * Application:
 * One example where a deque can be used is the A-Steal job scheduling algorithm.
 * This algorithm implements task scheduling for several processors.
 * A separate deque with threads to be executed is maintained for each processor.
 * To execute the next thread, the processor gets the first element from the deque
 * (using the "remove first element" deque operation). If the current thread forks,
 * it is put back to the front of the deque ("insert element at front")
 * and a new thread is executed. When one of the processors finishes execution of
 * its own threads (i.e. its deque is empty), it can "steal" a thread from
 * another processor: it gets the last element from the deque of another
 * processor ("remove last element") and executes it.
 * The steal-job scheduling algorithm is used by
 * Intel's Threading Building Blocks (TBB) library for parallel programming.
 *
 * Usage:
 * const Deque = require('./Deque')
 * const deque = new Deque([ 'A', 'B', 'C' ]) // deque = A->B->C
 * deque.first()      // => 'A', deque = A->B->C
 * deque.last()       // => 'C', deque = A->B->C
 * deque.push('D')    // deque = A->B->C->D
 * deque.shift()      // => 'A', deque = B->C->D
 * deque.pop()        // => 'D', deque = B->C
 * deque.size()       // => 2, deque = B->C
 * deque.unshift('A') // deque = A->B->C
 * deque.pop()        // => 'C', deque = A->B
 * deque.pop()        // => 'B', deque = A
 * deque.pop()        // => 'A', deque = null
 * deque.pop()        // throws RangeError when trying to remove from empty queue
 */
class Deque {
  /**
   * Create deque.
   *
   * @param {Array} input initial deque data
   */
  constructor(input = []) {
    this.list = new DoublyLinkedList()
    for (const item of input) this.push(item)
  }

  get length() {
    return this.list.length
  }

  get first() {
    return this.list.first
  }

  get last() {
    return this.list.last
  }

  /**
   * Add new element to the back of the deque.
   *
   * Performance: O(1)
   * @param {*} item
   */
  push(item) {
    this.list.addLast(item)
  }

  /**
   * Add new element to the front of the deque.
   *
   * Performance: O(1)
   * @param {*} item
   */
  unshift(item) {
    this.list.addFirst(item)
  }

  /**
   * Remove and return element from the back of the deque.
   *
   * Performance: O(1)
   * @returns {*}
   */
  pop() {
    if (this.list.length === 0) throw RangeError("Can't pop empty queue.")
    return this.list.removeLast()
  }

  /**
   * Remove and return element from the front of the deque.
   *
   * Performance: O(1)
   * @returns {*}
   */
  shift() {
    if (this.list.length === 0) throw RangeError("Can't shift empty queue.")
    return this.list.removeFirst()
  }
}

module.exports = Deque
