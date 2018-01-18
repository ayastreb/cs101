/**
 * Doubly Linked List is a linear data structure with sequential access.
 * List consists of nodes, where each node links to the next and previous node in the list.
 * First node is called head, last node is called tail.
 *
 * Application:
 * Doubly linked list can be used to implement Deque - a queue, where you can add and remove from both ends.
 * It is also used in places where you need to switch back and forward between the items:
 * undo/redo implementations, back/forward in browser history, etc.
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
 * const DoublyLinkedList = require('./DoublyLinkedList')
 * const list = new DoublyLinkedList([ 'A', 'B', 'C' ]) // list = A<->B<->C
 * list.removeFirst() // => 'A', list = B<->C
 * list.removeFirst() // => 'B', list = C
 * list.addLast('D')  // => list = C<->D
 * list.find(1)       // => 'D'
 * list.removeFirst() // => 'C', list = D
 * list.removeLast()  // => 'D', list = null
 * list.removeLast()  // => throws RangeError when trying to remove from empty list
 */

class DoublyLinkedList {
  /**
   * Push all items of given array into the list.
   *
   * Performance: O(n)
   * @param {Array} input initial list data
   */
  constructor(input = []) {
    this.length = 0
    this.head = null
    this.tail = null
    for (const item of input) this.addLast(item)
  }

  get first() {
    return this.head ? this.head.data : null
  }

  get last() {
    return this.tail ? this.tail.data : null
  }

  /**
   * Find item at the given position from the beginning of the list.
   * Position is a 0-based index:
   * A<->B<->C<->D
   * 0   1   2   3
   *
   * Performance: O(n)
   * @param {Number} index position of queried item
   * @returns {*}
   */
  find(index) {
    let current
    if (index >= this.length) {
      throw RangeError(`Index ${index} is out of range.`)
    }

    if (index < this.length / 2) {
      current = this.head
      for (let i = 0; i < index; i++) current = current.next
    } else {
      current = this.tail
      for (let i = this.length - 1; i > index; i--) current = current.prev
    }

    return current.data
  }

  /**
   * Add new item to the beginning of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  addFirst(item) {
    this.head = new Node(item, null, this.head)
    if (this.tail === null) this.tail = this.head
    this.length++
  }

  /**
   * Add new item to the end of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  addLast(item) {
    if (this.tail === null) return this.addFirst(item)

    const node = new Node(item, this.tail)
    this.tail.next = node
    this.tail = node
    this.length++
  }

  /**
   * Remove and return item from the beginning of the list.
   *
   * Performance: O(1)
   * @returns {*}
   */
  removeFirst() {
    if (this.head === null) throw RangeError("Can't remove from empty list.")

    const item = this.head.data
    this.head = this.head.next
    if (this.head === null) this.tail = null
    this.length--

    return item
  }

  /**
   * Remove and return item from the end of the list.
   *
   * Performance: O(1)
   * @returns {*}
   */
  removeLast() {
    if (this.tail === null) throw RangeError("Can't remove from empty list.")

    const item = this.tail.data
    this.tail = this.tail.prev
    if (this.tail === null) this.head = null
    this.length--

    return item
  }

  /**
   * Insert new item after given position.
   *
   * Performance: O(n)
   * @param {Number} index
   * @param {*} item
   */
  insertAfter(index, item) {
    if (index === 0) return this.addFirst(item)
    if (index === this.length) return this.addLast(item)
    if (index > this.length) throw RangeError(`Index ${index} is out of range.`)

    let current = this.head
    for (let i = 0; i < index; i++) current = current.next

    current.next = new Node(item, current, current.next)
  }

  /**
   * Iterate over current list.
   */
  *[Symbol.iterator]() {
    let current = this.head
    while (current !== null) {
      yield current.data
      current = current.next
    }
  }
}

class Node {
  /**
   * Node container.
   *
   * @param {*} data
   * @param {Node} prev
   * @param {Node} next
   */
  constructor(data, prev = null, next = null) {
    this.data = data
    this.prev = prev
    this.next = next
  }
}

module.exports = DoublyLinkedList
