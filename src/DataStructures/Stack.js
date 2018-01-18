const SinglyLinkedList = require('./SinglyLinkedList')
/**
 * Stack is an abstract data type with last in first out (LIFO) order of elements.
 * Stack allows adding and removing items only at one end of the structure.
 * Thus it can be implemented using singly linked list with constant performance.
 *
 * Application:
 * Stacks are used in expressions evaluation and syntax parsing (for example reverse Polish notation).
 * Stacks are also used in memory management, functions call stack and recursive calls.
 *
 * Usage:
 * const createStack = require('./Stack')
 * const stack = createStack([ 'A', 'B', 'C' ]) // stack = C->B->A
 * stack.peek()    // => 'C', stack = C->B->A
 * stack.push('D') // stack = D->C->B->A
 * stack.pop()     // => 'D', stack = C->B->A
 * stack.pop()     // => 'C', stack = B->A
 * stack.size()    // => 2, stack = B->A
 * stack.pop()     // => B, stack = A
 * stack.pop()     // => A, stack = null
 * stack.pop()     // throws RangeError when trying to pop empty stack
 *
 * @param {Array} input initial stack data
 */
module.exports = (input = []) => {
  const list = new SinglyLinkedList()

  initialize(input)
  /** Public interface */
  return {
    peek,
    push,
    pop,
    get length() {
      return list.length
    }
  }

  /**
   * Push all elements of given array into the stack.
   *
   * Performance: O(n)
   * @param {Array} input initial stack data
   */
  function initialize(input) {
    input.forEach(push)
  }

  /**
   * Return top element of the stack without removing it.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function peek() {
    return list.first
  }

  /**
   * Add new item to the stack.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function push(item) {
    list.addFirst(item)
  }

  /**
   * Remove and return top item from the stack.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function pop() {
    if (list.length === 0) throw RangeError("Can't pop from empty stack.")
    return list.removeFirst()
  }
}
