const test = require('tape')
const createHashTable = require('./HashTable')

runTestSuite('StringHash', undefined) // use default string hash function
runTestSuite('AlwaysCollide', () => { return 1 }) // hash all keys to the same index

function runTestSuite (name, hashFunc) {
  test(`${name}: create empty table`, assert => {
    const hashTable = createHashTable(hashFunc)

    assert.equal(hashTable.size(), 0)
    assert.end()
  })

  test(`${name}: throw error when key is invalid`, assert => {
    const hashTable = createHashTable(hashFunc)

    assert.throws(() => hashTable.set(undefined, 'foo'), TypeError)
    assert.throws(() => hashTable.set([ 'bar' ], 'foo'), TypeError)
    assert.throws(() => hashTable.set({ foo: 'baz' }, 'foo'), TypeError)
    assert.end()
  })

  test(`${name}: add element to the table`, assert => {
    const hashTable = createHashTable(hashFunc)

    hashTable.set('foo', 'bar')
    assert.equal(hashTable.size(), 1)
    assert.end()
  })

  test(`${name}: get element from the table`, assert => {
    const hashTable = createHashTable(hashFunc)

    assert.equal(hashTable.get('baz'), null)
    hashTable.set('foo', 'bar')
    assert.equal(hashTable.get('foo'), 'bar')
    assert.equal(hashTable.get('bat'), null)
    hashTable.set(10, 'bat')
    assert.equal(hashTable.get(10), 'bat')
    assert.end()
  })

  test(`${name}: element is unique by key`, assert => {
    const hashTable = createHashTable(hashFunc)

    hashTable.set('foo', 'bar')
    hashTable.set('fee', 'ber')
    assert.equal(hashTable.get('foo'), 'bar')
    assert.equal(hashTable.size(), 2)
    hashTable.set('foo', 'baz')
    assert.equal(hashTable.get('foo'), 'baz')
    assert.equal(hashTable.get('fee'), 'ber')
    assert.equal(hashTable.size(), 2)
    assert.end()
  })

  test(`${name}: remove element from the table`, assert => {
    const hashTable = createHashTable(hashFunc)

    hashTable.set('foo', 'bar')
    assert.equal(hashTable.size(), 1)
    assert.equal(hashTable.remove('fee'), false)
    assert.equal(hashTable.remove('foo'), true)
    assert.equal(hashTable.size(), 0)
    assert.equal(hashTable.remove('foo'), false)
    assert.end()
  })
}
