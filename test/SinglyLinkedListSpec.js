const test = require('tape');
const SinglyLinkedList = require('../src/SinglyLinkedList');

test('create empty list', assert => {
    const list = SinglyLinkedList();
    assert.equal(list.size(), 0);
    assert.equal(list.headNode(), null);
    assert.equal(list.tailNode(), null);
    assert.end();
});

test('add items to the beginning of the list', assert => {
    const list = SinglyLinkedList();
    list.addFirst('foo');
    list.addFirst('bar');
    assert.equal(list.size(), 2);
    assert.equal(list.tailNode().data, 'foo');
    assert.equal(list.headNode().data, 'bar');
    assert.end();
});

test('remove items from the beginning of the list', assert => {
    const list = SinglyLinkedList();
    list.addFirst('foo');
    list.addFirst('bar');
    assert.equal(list.removeFirst(), 'bar');
    assert.equal(list.removeFirst(), 'foo');
    assert.equal(list.headNode(), null);
    assert.equal(list.tailNode(), null);
    assert.equal(list.size(), 0);
    assert.end();
});

test('add items to the end of the list', assert => {
    const list = SinglyLinkedList();
    list.addLast('baz');
    list.addLast('bar');
    list.addLast('foo');
    assert.equal(list.size(), 3);
    assert.equal(list.removeFirst(), 'baz');
    assert.equal(list.removeFirst(), 'bar');
    assert.equal(list.removeFirst(), 'foo');
    assert.end();
});

test('remove items from the end of the list', assert => {
    const list = SinglyLinkedList(['foo', 'baz', 'bar']);
    assert.equal(list.removeLast(), 'bar');
    assert.equal(list.removeLast(), 'baz');
    assert.equal(list.removeLast(), 'foo');
    assert.equal(list.headNode(), null);
    assert.equal(list.tailNode(), null);
    assert.end();
});

test('create list from array', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    assert.equal(list.size(), 3);
    assert.equal(list.removeFirst(), 'foo');
    assert.equal(list.removeFirst(), 'bar');
    assert.equal(list.removeFirst(), 'baz');
    assert.end();
});

test('create multiple lists', assert => {
    const listA = SinglyLinkedList(['foo', 'bar']);
    const listB = SinglyLinkedList(['baz']);

    assert.equal(listA.size(), 2);
    assert.equal(listB.size(), 1);
    assert.equal(listA.removeFirst(), 'foo');
    assert.equal(listB.removeFirst(), 'baz');
    assert.end();
});

test('insert item after given position', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    list.insertAfter(1, 'bad');// after 'bar'
    assert.deepEqual([...list], ['foo', 'bar', 'bad', 'baz']);
    list.insertAfter(3, 'bac');// after 'baz'
    assert.deepEqual([...list], ['foo', 'bar', 'bad', 'baz', 'bac']);
    assert.throws(() => list.insertAfter(5, 'too much'), RangeError);
    assert.end();
});

test('insert item after given position into empty list', assert => {
    const list = SinglyLinkedList();
    list.insertAfter(0, 'foo');
    assert.equal(list.size(), 1);
    list.insertAfter(1, 'bar');
    assert.deepEqual([...list], ['foo', 'bar']);
    assert.end();
});

test('throws error when removing from empty list', assert => {
    const list = SinglyLinkedList();
    assert.throws(() => list.removeFirst(), RangeError);
    assert.throws(() => list.removeLast(), RangeError);
    assert.end();
});

test('find item by position index', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    assert.equal(list.find(0), 'foo');
    assert.equal(list.find(2), 'baz');
    assert.end();
});

test('throws error when trying to find item out of range', assert => {
    const list = SinglyLinkedList(['foo']);
    assert.throws(() => list.find(1), RangeError);
    assert.end();
});

test('iterate over list using spread', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    assert.deepEqual([...list], ['foo', 'bar', 'baz']);
    assert.end();
});

test('iterate over list using for loop', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    let counter = 0;
    for (var item of list) {
        assert.equal(typeof item, 'string');
        counter++;
    }
    assert.equal(counter, 3);
    assert.end();
});

test('iterate over empty list', assert => {
    const emptyList = SinglyLinkedList();
    assert.deepEqual([...emptyList], []);

    assert.end();
});
