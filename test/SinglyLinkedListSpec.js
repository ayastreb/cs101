const test = require('tape');
const SinglyLinkedList = require('../src/SinglyLinkedList');

test('create empty list', assert => {
    const list = SinglyLinkedList();
    assert.equal(list.size(), 0);
    assert.end();
});

test('push items to the beginning of the list', assert => {
    const list = SinglyLinkedList();
    list.push('foo');
    list.push('bar');
    assert.equal(list.size(), 2);
    assert.end();
});

test('pop items from the beginning of the list', assert => {
    const list = SinglyLinkedList();
    list.push('foo');
    list.push('bar');
    assert.equal(list.pop(), 'bar');
    assert.equal(list.pop(), 'foo');
    assert.equal(list.size(), 0);
    assert.end();
});

test('unshift item to the end of the list', assert => {
    const list = SinglyLinkedList();
    list.unshift('baz');
    list.unshift('bar');
    list.unshift('foo');
    assert.equal(list.size(), 3);
    assert.equal(list.pop(), 'baz');
    assert.equal(list.pop(), 'bar');
    assert.equal(list.pop(), 'foo');
    assert.end();
});

test('shift item from the end of the list', assert => {
    const list = SinglyLinkedList(['foo', 'baz', 'bar']);
    assert.equal(list.shift(), 'foo');
    assert.equal(list.shift(), 'baz');
    assert.equal(list.shift(), 'bar');
    assert.end();
});

test('create list from array', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    assert.equal(list.size(), 3);
    assert.equal(list.pop(), 'baz');
    assert.equal(list.pop(), 'bar');
    assert.equal(list.pop(), 'foo');
    assert.end();
});

test('create multiple lists', assert => {
    const listA = SinglyLinkedList(['foo', 'bar']);
    const listB = SinglyLinkedList(['baz']);

    assert.equal(listA.size(), 2);
    assert.equal(listB.size(), 1);
    assert.equal(listA.pop(), 'bar');
    assert.equal(listB.pop(), 'baz');
    assert.end();
});

test('throws error when empty list is popped or shifted', assert => {
    const list = SinglyLinkedList();
    assert.throws(() => list.pop(), RangeError);
    assert.throws(() => list.shift(), RangeError);
    assert.end();
});

test('find item by index', assert => {
    const list = SinglyLinkedList(['foo', 'bar', 'baz']);
    assert.equal(list.find(0), 'baz');
    assert.equal(list.find(2), 'foo');
    assert.end();
});

test('throws error when trying to get item out of range', assert => {
    const list = SinglyLinkedList(['foo']);
    assert.throws(() => list.find(1), RangeError);
    assert.end();
});
