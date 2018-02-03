const test = require('tape')
const count = require('./CountWords')

test('it counts words and sorts by frequency', assert => {
  assert.deepEqual(
    count(
      "Practice makes perfect, you'll get perfecT by practice. just practice! just just just!!"
    ),
    [
      ['just', '4'],
      ['practice', '3'],
      ['perfect', '2'],
      ['makes', '1'],
      ['youll', '1'],
      ['get', '1'],
      ['by', '1']
    ]
  )

  assert.deepEqual(count('To be, or  not to  be, that is the question:'), [
    ['to', '2'],
    ['be', '2'],
    ['or', '1'],
    ['not', '1'],
    ['that', '1'],
    ['is', '1'],
    ['the', '1'],
    ['question', '1']
  ])
  assert.end()
})
