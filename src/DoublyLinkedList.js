/**
 * Doubly Linked List is a linear data structure with sequential access.
 * List consists of nodes, where each node links to the next and previous node in the list.
 * First node is called head, last node is called tail.
 *
 * Advantages:
 * - constant time add/remove item from the beginning and from the end of the list
 * - search is ~2x faster than singly linked list
 * - traversing in both directions
 *
 * Disadvantages:
 * - linear time search of item in the list
 * - more memory than singly linked list
 *
 * Usage:
 *
 * const DoublyLinkedList = require('DoublyLinkedList')
 * const list = DoublyLinkedList(['A', 'B', 'C']) // list = A->B->C
 * list.removeFirst() // => 'A', list = B->C
 * list.removeFirst() // => 'B', list = C
 * list.addLast('D')  // => list = C->D
 * list.find(1)       // => 'D'
 * list.removeFirst() // => 'C', list = D
 * list.removeLast()  // => 'D', list = null
 * list.removeLast()  // => throws Error when trying to remove from empty list
 *
 * @param {Array} input initial list data
 */
module.exports = (input = []) => {
  let length = 0
  let head = null
  let tail = null

  initialize(input)
  /** Public interface */
  return {
    headNode,
    tailNode,
    size,
    find,
    addFirst,
    addLast,
    removeFirst,
    removeLast,
    insertAfter,
    [Symbol.iterator]: iterator
  }

  /**
   * Push all items of given array into the list.
   *
   * Performance: O(n)
   * @param {Array} input initial list data
   */
  function initialize (input) {
    input.forEach(addLast)
  }

  /**
   * Expose head node.
   *
   * @returns {Object} current head node
   */
  function headNode () {
    return head
  }

  /**
   * Expose tail node.
   *
   * @returns {Object} current tail node
   */
  function tailNode () {
    return tail
  }

  /**
   * Get current list size.
   *
   * Performance: O(1)
   * @returns {Number}
   */
  function size () {
    return length
  }

  /**
   * Find item at given position from the beginning of the list.
   *
   * Performance: O(n)
   * @param {Number} index position of queried item
   * @returns {*}
   */
  function find (index) {
    if (index >= size()) throw RangeError(`Index ${index} is out of range.`)
    let current
    if (index < size() / 2) {
      current = head
      for (let i = 0; i < index; i++) current = current.next
    } else {
      current = tail
      for (let i = size() - 1; i > index; i--) current = current.prev
    }

    return current.data
  }

  /**
   * Add new item to the beginning of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function addFirst (item) {
    head = {
      data: item,
      next: head,
      prev: null
    }
    if (tail === null) tail = head
    length++
  }

  /**
   * Add new item to the end of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function addLast (item) {
    if (tail === null) return addFirst(item)
    const node = {
      data: item,
      next: null,
      prev: tail
    }
    tail.next = node
    tail = node
    length++
  }

  /**
   * Remove and return item from the beginning of the list.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function removeFirst () {
    if (head === null) throw RangeError("Can't remove from empty list.")
    const item = head.data
    head = head.next
    if (head === null) tail = null
    length--

    return item
  }

  /**
   * Remove and return item from the end of the list.
   *
   * Performance: O(1)
   * @returns {*}
   */
  function removeLast () {
    if (tail === null) throw RangeError("Can't remove from empty list.")
    const item = tail.data
    tail = tail.prev
    if (tail === null) head = null
    length--

    return item
  }

  /**
   * Insert new item after given position.
   *
   * Performance: O(n)
   * @param {Number} index
   * @param {*} item
   */
  function insertAfter (index, item) {
    if (index === 0) return addFirst(item)
    if (index === size()) return addLast(item)
    if (index > size()) throw RangeError(`Index ${index} is out of range.`)

    let current = head
    for (let i = 0; i < index; i++) {
      current = current.next
    }

    current.next = {
      data: item,
      next: current.next,
      prev: current.prev
    }
  }

  /**
   * Iterate over current list.
   */
  function* iterator () {
    let current = head
    while (current !== null) {
      yield current.data
      current = current.next
    }
  }
}
