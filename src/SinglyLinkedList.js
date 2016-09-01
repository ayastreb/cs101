/**
 * Singly Linked List is a linear data structure with sequential access.
 *
 * Advantages:
 * - constant time add/remove item from the beginning of the list (push/pop)
 * - less memory than Doubly Linked List
 * - simple implementation
 *
 * Disadvantages:
 * - linear time add/remove item from the end of the list (unshift/shift)
 * - linear time search of item in the list
 * - reverse traversing is impossible
 * - more memory than Array
 *
 * Usage:
 *
 * const SinglyLinkedList = require('SinglyLinkedList');
 * const list = SinglyLinkedList(['A', 'B', 'C']);
 * list.pop(); // => 'C'
 * list.pop(); // => 'B'
 * list.push('D');
 * list.pop(); // => 'D'
 * list.pop(); // => 'A'
 * list.pop(); // => throws Error when trying to pop empty list
 *
 * @param {Array} array initial list data
 */
module.exports = (array = []) => {
    let length = 0;
    let head = null;
    initialize(array);

    return {
        size,
        push,
        pop
    };

    /**
     * Push all items of given array into the list.
     *
     * Performance: O(n)
     * @param {Array} array input
     */
    function initialize(array) {
        array.forEach(push);
    }

    /**
     * Get current list size.
     *
     * Performance: O(1)
     * @returns {Number}
     */
    function size() {
        return length;
    }

    /**
     * Push new item to the head of the list.
     *
     * Performance: O(1)
     * @param {*} item
     */
    function push(item) {
        head = {
            data: item,
            next: head
        };
        length++;
    }

    /**
     * Pop item from the head of the list.
     *
     * Performance: O(1)
     * @returns {*}
     */
    function pop() {
        if (head === null) throw Error("Can't pop from empty list.");
        const item = head.data;
        head = head.next;
        length--;

        return item;
    }
};
