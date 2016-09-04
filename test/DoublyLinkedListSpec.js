const test = require('tape');
const DoublyLinkedList = require('../src/DoublyLinkedList');

test('create empty list', assert => {
    const list = DoublyLinkedList();
    assert.equal(list.size(), 0);
    assert.equal(list.headNode(), null);
    assert.equal(list.tailNode(), null);
    assert.end();
});
