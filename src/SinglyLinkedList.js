/**
 * Singly Linked List is a linear data structure with sequential access.
 * List consists of nodes, where each node links to the next node in the list.
 * First node is called head, last node is called tail.
 *
 * Advantages:
 * - constant time add/remove item from the beginning of the list
 * - constant time add to the end of the list
 * - less memory than Doubly Linked List
 * - simple implementation
 *
 * Disadvantages:
 * - linear time remove item from the end of the list
 * - linear time search of item in the list
 * - reverse traversing is impossible
 * - more memory than Array
 *
 * Usage:
 *
 * const SinglyLinkedList = require('SinglyLinkedList')
 * const list = SinglyLinkedList(['A', 'B', 'C']) // list = A->B->C
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
    let current = head
    for (let i = 0; i < index; i++) current = current.next

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
      next: head
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
      next: null
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
   * Performance: O(n)
   * @returns {*}
   */
  function removeLast () {
    if (head === null) throw RangeError("Can't remove from empty list.")
    if (size() === 1) return removeFirst()

    let previous
    let current = head
    while (current.next !== null) {
      previous = current
      current = current.next
    }
    previous.next = null
    length--

    return current.data
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

    let previous
    let current = head
    for (let i = 0; i <= index; i++) {
      previous = current
      current = current.next
    }

    previous.next = {
      data: item,
      next: current
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
