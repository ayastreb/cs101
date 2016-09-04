module.exports = (input = []) => {
    let length = 0;
    let head = null;
    let tail = null;

    initialize(input);

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
    };

    function initialize(input) {

    }

    function headNode() {
        return head;
    }

    function tailNode() {
        return tail;
    }

    function size() {
        return length;
    }

    function find(index) {

    }

    function addFirst(item) {

    }

    function addLast(item) {

    }

    function removeFirst() {

    }

    function removeLast() {

    }

    function insertAfter(node, item) {

    }

    function iterator() {

    }
};
