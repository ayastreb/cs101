const test = require('tape')
const createLinkedHashTable = require('./LinkedHashTable')
const createLinearHashTable = require('./LinearHashTable')

runTestSuite('LinkedHashTable', createLinkedHashTable)
runTestSuite('LinearHashTable', createLinearHashTable)

function runTestSuite(name, createHashTable) {
  test(`${name}: set values`, assert => {
    const hashTable = createHashTable()
    hashTable.set('foo', 'bar')
    hashTable.set('baz', 'bad')
    hashTable.set('abcd', 'abcd1')
    hashTable.set('abcd', 'abcd2')

    assert.equal(hashTable.size, 3)
    assert.equal(hashTable.has('foo'), true)
    assert.equal(hashTable.has('baz'), true)
    assert.equal(hashTable.has('bac'), false)
    assert.equal(hashTable.has('abcd'), true)
    assert.equal(hashTable.get('foo'), 'bar')
    assert.equal(hashTable.get('baz'), 'bad')
    assert.equal(hashTable.get('bac'), undefined)
    assert.equal(hashTable.get('abcd'), 'abcd2')
    assert.end()
  })

  test(`${name}: falsy values`, assert => {
    const hashTable = createHashTable()
    hashTable.set('false_value', false)
    hashTable.set('null_value', null)
    hashTable.set('zero_value', 0)
    hashTable.set('negative_value', -1)
    hashTable.set('undefined_value', undefined)

    assert.equal(hashTable.size, 5)
    assert.equal(hashTable.has('false_value'), true)
    assert.equal(hashTable.has('null_value'), true)
    assert.equal(hashTable.has('zero_value'), true)
    assert.equal(hashTable.has('negative_value'), true)
    assert.equal(hashTable.has('undefined_value'), true)

    assert.equal(hashTable.get('false_value'), false)
    assert.equal(hashTable.get('null_value'), null)
    assert.equal(hashTable.get('zero_value'), 0)
    assert.equal(hashTable.get('negative_value'), -1)
    assert.equal(hashTable.get('undefined_value'), undefined)

    assert.end()
  })

  test(`${name}: remove values`, assert => {
    const hashTable = createHashTable(input => input.split('_')[1])
    hashTable.set('foo_10', 1)
    hashTable.set('baz_10', 2)
    hashTable.set('bar_10', 3)
    hashTable.set('bab_10', 4)
    hashTable.set('bac_10', 5)
    hashTable.set('foo_11', 6)
    hashTable.set('baz_11', 7)
    hashTable.set('bar_11', 8)
    hashTable.set('foo_30', 9)
    hashTable.set('baz_30', 10)
    hashTable.set('bar_30', 11)
    hashTable.set('bab_30', 12)

    assert.equal(hashTable.size, 12)

    hashTable.remove('baz_10')
    assert.equal(hashTable.size, 11)
    assert.equal(hashTable.has('baz_10'), false)
    assert.equal(hashTable.get('foo_10'), 1)
    assert.equal(hashTable.get('bar_10'), 3)
    assert.equal(hashTable.get('bac_10'), 5)
    assert.equal(hashTable.get('foo_11'), 6)
    assert.equal(hashTable.get('baz_11'), 7)
    assert.equal(hashTable.get('bar_11'), 8)
    assert.equal(hashTable.get('foo_30'), 9)
    assert.equal(hashTable.get('bab_30'), 12)
    // try to remove again
    hashTable.remove('baz_10')
    assert.equal(hashTable.size, 11)

    assert.end()
  })

  test(`${name}: remove circular with overflow`, assert => {
    const hashTable = createHashTable(input => input.split('_')[1])
    hashTable.set('foo_10', 1)
    hashTable.set('baz_10', 2)
    hashTable.set('bar_10', 3)
    hashTable.set('bab_10', 4)
    hashTable.set('bac_10', 5)
    hashTable.set('foo_11', 6)
    hashTable.set('baz_11', 7)
    hashTable.set('bar_11', 8)
    hashTable.set('foo_30', 9)
    hashTable.set('baz_30', 10)
    hashTable.set('bar_30', 11)
    hashTable.set('bab_30', 12)

    hashTable.remove('foo_30')
    assert.equal(hashTable.size, 11)
    assert.equal(hashTable.has('foo_30'), false)
    assert.equal(hashTable.get('foo_10'), 1)
    assert.equal(hashTable.get('bar_10'), 3)
    assert.equal(hashTable.get('bac_10'), 5)
    assert.equal(hashTable.get('foo_11'), 6)
    assert.equal(hashTable.get('bar_11'), 8)
    assert.equal(hashTable.get('baz_30'), 10)
    assert.equal(hashTable.get('bar_30'), 11)
    assert.equal(hashTable.get('bab_30'), 12)

    assert.end()
  })

  test(`${name}: remove when next is higher`, assert => {
    const hashTable = createHashTable(input => input.split('_')[1])
    hashTable.set('foo_1', 1)
    hashTable.set('baz_1', 2)
    hashTable.set('bar_1', 3)
    hashTable.set('bab_1', 4)
    hashTable.set('bac_1', 5)
    hashTable.set('foo_6', 6)

    hashTable.remove('bab_1')
    assert.equal(hashTable.size, 5)
    assert.equal(hashTable.has('bab_1'), false)
    assert.equal(hashTable.get('foo_1'), 1)
    assert.equal(hashTable.get('baz_1'), 2)
    assert.equal(hashTable.get('bar_1'), 3)
    assert.equal(hashTable.get('bac_1'), 5)
    assert.equal(hashTable.get('foo_6'), 6)

    assert.end()
  })

  test(`${name}: big input`, assert => {
    const hashTable = createHashTable()
    const n = 10000
    for (let i = 0; i < n; i++) {
      hashTable.set(`key_${i}`, i * 2)
    }
    assert.equal(hashTable.size, n)
    for (let i = 0; i < n; i++) {
      assert.equal(hashTable.get(`key_${i}`), i * 2)
    }

    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        hashTable.remove(`key_${i}`)
      }
    }

    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        assert.equal(
          hashTable.has(`key_${i}`),
          false,
          `should not have key_${i}`
        )
      } else {
        assert.equal(hashTable.get(`key_${i}`), i * 2, `should have key_${i}`)
      }
    }

    assert.end()
  })
}
