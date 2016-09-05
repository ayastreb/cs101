const createSinglyLinkedList = require('./SinglyLinkedList')
/**
 * Stack is an abstract data type with last in first out (LIFO) order of elements.
 * Stack allows adding and removing items only at one end of the structure.
 * Thus it can be implemented using singly linked list with constant performance.
 *
 * Application:
 * Stacks are used in expressions evaluation and syntax parsing (for example reverse Polish notation).
 * Stacks are also used in memory management, functions call stack and recursive calls.
 *
 * @param {Array} input initial stack data
 */
module.exports = (input = []) => {
  const list = createSinglyLinkedList()

  initialize(input)
  /** Public interface */
  return {
    size,
    peek,
    push,
    pop
  }

  /**
   * Push all elements of given array into the stack.
   *
   * Performance: O(n)
   * @param {Array} input initial stack data
   */
  function initialize (input) {
    input.forEach(push)
  }

  /**
   * Get current stack size.
   *
   * Performance: O(1)
   * @returns {number}
   */
  function size () {
    return list.size()
  }

  /**
   * Return top element of the stack without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function peek () {
    return list.size() > 0 ? list.headNode().data : null
  }

  /**
   * Add new item to the stack.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function push (item) {
    list.addFirst(item)
  }

  /**
   * Remove and return top item from the stack.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function pop () {
    if (list.size() === 0) throw RangeError("Can't pop from empty stack.")
    return list.removeFirst()
  }
}
