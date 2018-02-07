const test = require('tape')
/**
 * Given a dictionary dict, return a flattened version of it .
 *
 * Example:
 * input:  dict = {
 *           "Key1" : "1",
 *           "Key2" : {
 *               "a" : "2",
 *               "b" : "3",
 *               "c" : {
 *                   "d" : "3",
 *                   "e" : "1"
 *               }
 *           }
 *       }
 *
 * output: {
 *           "Key1" : "1",
 *           "Key2.a" : "2",
 *           "Key2.b" : "3",
 *           "Key2.c.d" : "3",
 *           "Key2.c.e" : "1"
 *       }
 * @param {Object} dict
 * @returns {Object}
 */
function flattenDictionary(dict) {
  return flatten(dict)

  /**
   * Recursievly iterate over `dict` appending parent key
   * to the keys as we go deeper in recursion.
   *
   * @param {Object} dict
   * @param {String} parent
   * @returns {Object}
   */
  function flatten(dict, parent = '') {
    const result = {}

    for (const key of Object.keys(dict)) {
      const flatKey = flattenKey(parent, key)
      if (dict[key] instanceof Object) {
        Object.assign(result, flatten(dict[key], flatKey))
      } else {
        result[flatKey] = dict[key]
      }
    }

    return result
  }

  function flattenKey(parent, child) {
    return parent.length > 0 && child.length > 0
      ? `${parent}.${child}`
      : parent.length > 0 ? parent : child
  }
}

test('flattens dictionary', assert => {
  assert.deepEqual(
    flattenDictionary({
      Key1: '1',
      Key2: { a: '2', b: '3', c: { d: '3', e: '1' } }
    }),
    {
      Key1: '1',
      'Key2.a': '2',
      'Key2.b': '3',
      'Key2.c.d': '3',
      'Key2.c.e': '1'
    }
  )
  assert.end()
})

test('flattens deep dictionary', assert => {
  assert.deepEqual(
    flattenDictionary({
      a: { b: { c: { d: { e: { f: { '': 'deep' } } } } } }
    }),
    { 'a.b.c.d.e.f': 'deep' }
  )
  assert.end()
})

test('dictionary with empty key', assert => {
  assert.deepEqual(flattenDictionary({ '': { a: '1' }, b: '3' }), {
    a: '1',
    b: '3'
  })
  assert.end()
})
