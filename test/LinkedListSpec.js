const test = require('tape')
const SinglyLinkedList = require('../src/SinglyLinkedList')
const DoublyLinkedList = require('../src/DoublyLinkedList')

runTestSuite('Singly Linked', SinglyLinkedList)
runTestSuite('Doubly Linked', DoublyLinkedList)

function runTestSuite (name, implementation) {
  test(`${name}: create empty list`, assert => {
    const list = implementation()
    assert.equal(list.size(), 0)
    assert.equal(list.headNode(), null)
    assert.equal(list.tailNode(), null)
    assert.end()
  })

  test(`${name}: add items to the beginning of the list`, assert => {
    const list = implementation()
    list.addFirst('foo')
    list.addFirst('bar')
    assert.equal(list.size(), 2)
    assert.equal(list.tailNode().data, 'foo')
    assert.equal(list.headNode().data, 'bar')
    assert.end()
  })

  test(`${name}: remove items from the beginning of the list`, assert => {
    const list = implementation()
    list.addFirst('foo')
    list.addFirst('bar')
    assert.equal(list.removeFirst(), 'bar')
    assert.equal(list.removeFirst(), 'foo')
    assert.equal(list.headNode(), null)
    assert.equal(list.tailNode(), null)
    assert.equal(list.size(), 0)
    assert.end()
  })

  test(`${name}: add items to the end of the list`, assert => {
    const list = implementation()
    list.addLast('baz')
    list.addLast('bar')
    list.addLast('foo')
    assert.equal(list.size(), 3)
    assert.equal(list.removeFirst(), 'baz')
    assert.equal(list.removeFirst(), 'bar')
    assert.equal(list.removeFirst(), 'foo')
    assert.end()
  })

  test(`${name}: remove items from the end of the list`, assert => {
    const list = implementation([ 'foo', 'baz', 'bar' ])
    assert.equal(list.removeLast(), 'bar')
    assert.equal(list.removeLast(), 'baz')
    assert.equal(list.removeLast(), 'foo')
    assert.equal(list.headNode(), null)
    assert.equal(list.tailNode(), null)
    assert.end()
  })

  test(`${name}: create list from array`, assert => {
    const list = implementation([ 'foo', 'bar', 'baz' ])
    assert.equal(list.size(), 3)
    assert.equal(list.removeFirst(), 'foo')
    assert.equal(list.removeFirst(), 'bar')
    assert.equal(list.removeFirst(), 'baz')
    assert.end()
  })

  test(`${name}: create multiple lists`, assert => {
    const listA = implementation([ 'foo', 'bar' ])
    const listB = implementation([ 'baz' ])

    assert.equal(listA.size(), 2)
    assert.equal(listB.size(), 1)
    assert.equal(listA.removeFirst(), 'foo')
    assert.equal(listB.removeFirst(), 'baz')
    assert.end()
  })

  test(`${name}: insert item after given position`, assert => {
    const list = implementation([ 'foo', 'bar', 'baz' ])
    list.insertAfter(1, 'bad')// after 'bar'
    assert.deepEqual([ ...list ], [ 'foo', 'bar', 'bad', 'baz' ])
    list.insertAfter(3, 'bac')// after 'baz'
    assert.deepEqual([ ...list ], [ 'foo', 'bar', 'bad', 'baz', 'bac' ])
    assert.throws(() => list.insertAfter(5, 'too much'), RangeError)
    assert.end()
  })

  test(`${name}: insert item after given position into empty list`, assert => {
    const list = implementation()
    list.insertAfter(0, 'foo')
    assert.equal(list.size(), 1)
    list.insertAfter(1, 'bar')
    assert.deepEqual([ ...list ], [ 'foo', 'bar' ])
    assert.end()
  })

  test(`${name}: throws error when removing from empty list`, assert => {
    const list = implementation()
    assert.throws(() => list.removeFirst(), RangeError)
    assert.throws(() => list.removeLast(), RangeError)
    assert.end()
  })

  test(`${name}: find item by position index`, assert => {
    const list = implementation([ 'foo', 'bar', 'baz' ])
    assert.equal(list.find(0), 'foo')
    assert.equal(list.find(1), 'bar')
    assert.equal(list.find(2), 'baz')
    list.addLast('bad')
    list.addLast('bac')
    // list = foo->bar->baz->bad->bac
    assert.equal(list.find(3), 'bad')
    assert.equal(list.find(4), 'bac')
    assert.end()
  })

  test(`${name}: throws error when trying to find item out of range`, assert => {
    const list = implementation([ 'foo' ])
    assert.throws(() => list.find(1), RangeError)
    assert.end()
  })

  test(`${name}: iterate over list using spread`, assert => {
    const list = implementation([ 'foo', 'bar', 'baz' ])
    assert.deepEqual([ ...list ], [ 'foo', 'bar', 'baz' ])
    assert.end()
  })

  test(`${name}: iterate over list using for loop`, assert => {
    const list = implementation([ 'foo', 'bar', 'baz' ])
    let output = []
    for (let item of list) {
      output.push(item)
    }
    assert.equal(output.length, 3)
    assert.deepEqual(output, [ 'foo', 'bar', 'baz' ])
    assert.end()
  })

  test(`${name}: iterate over empty list`, assert => {
    const emptyList = implementation()
    assert.deepEqual([ ...emptyList ], [])

    assert.end()
  })
}
