const createDoublyLinkedList = require('./DoublyLinkedList')
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
 * const createDeque = require('./Deque')
 * const deque = createDeque([ 'A', 'B', 'C' ]) // deque = A->B->C
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
 *
 * @param {Array} input initial deque data
 */
module.exports = (input = []) => {
  const list = createDoublyLinkedList()

  initialize(input)
  /** Public interface */
  return {
    size,
    first,
    last,
    push,
    unshift,
    pop,
    shift
  }

  /**
   * Add all elements of given array to the deque.
   *
   * Performance: O(n)
   * @param {Array} input initial deque data
   */
  function initialize (input) {
    input.forEach(push)
  }

  /**
   * Get current deque size.
   *
   * Performance: O(1)
   * @returns {number}
   */
  function size () {
    return list.size()
  }

  /**
   * Return value of first element without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function first () {
    return list.showFirst()
  }

  /**
   * Return value of last element without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function last () {
    return list.showLast()
  }

  /**
   * Add new element to the back of the deque.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function push (item) {
    list.addLast(item)
  }

  /**
   * Add new element to the front of the deque.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function unshift (item) {
    list.addFirst(item)
  }

  /**
   * Remove and return element from the back of the deque.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function pop () {
    if (list.size() === 0) throw RangeError("Can't pop empty queue.")
    return list.removeLast()
  }

  /**
   * Remove and return element from the front of the deque.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function shift () {
    if (list.size() === 0) throw RangeError("Can't shift empty queue.")
    return list.removeFirst()
  }
}
