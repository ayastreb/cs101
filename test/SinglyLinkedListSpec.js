const test = require('tape');
const SinglyLinkedList = require('../src/SinglyLinkedList');

test('create empty list', assert => {
    const list = SinglyLinkedList();
    assert.equal(list.size(), 0);
    assert.end();
});

test('push items to the list', assert => {
    const list = SinglyLinkedList();
    list.push('foo');
    list.push('bar');
    assert.equal(list.size(), 2);
    assert.end();
});

test('pop items from the list', assert => {
    const list = SinglyLinkedList();
    list.push('foo');
    list.push('bar');
    assert.equal(list.pop(), 'bar');
    assert.equal(list.pop(), 'foo');
    assert.equal(list.size(), 0);
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
