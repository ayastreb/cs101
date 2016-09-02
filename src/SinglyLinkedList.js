/**
 * Singly Linked List is a linear data structure with sequential access.
 * Basic implementation without tail pointer.
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
        pop,
        shift,
        unshift,
        find,
        [Symbol.iterator]: iterator,
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
     * Add new item to the beginning of the list.
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
     * Remove and return item from the beginning of the list.
     *
     * Performance: O(1)
     * @returns {*}
     */
    function pop() {
        if (head === null) throw RangeError("Can't pop from empty list.");
        const item = head.data;
        head = head.next;
        length--;

        return item;
    }

    /**
     * Add item to the end of the list.
     *
     * Performance: O(n)
     * @param {*} item
     */
    function unshift(item) {
        if (head === null) return push(item);
        let current = head;

        while (current.next !== null) current = current.next;
        current.next = {
            data: item,
            next: null
        };
        length++;
    }

    /**
     * Remove and return item from the end of the list.
     *
     * Performance: O(n)
     * @returns {*}
     */
    function shift() {
        if (head === null) throw RangeError("Can't shift from empty list.");
        if (size() === 1) return pop();

        let previous, current = head;
        while (current.next !== null) {
            previous = current;
            current = current.next;
        }
        previous.next = null;
        length--;

        return current.data;
    }

    /**
     * Find item at given position from the beginning of the list.
     *
     * Performance: O(n)
     * @param {Number} index position of queried item
     * @returns {*}
     */
    function find(index) {
        if (index >= size()) throw RangeError(`Index ${index} is out of range.`);
        let current = head;
        for (var i = 0; i < index; i++) {
            current = current.next;
        }

        return current.data;
    }

    /**
     * Iterate over current list.
     */
    function* iterator() {
        let current = head;
        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
};
