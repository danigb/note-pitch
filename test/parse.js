var vows = require('vows')
var assert = require('assert')

var Note = require('..')

vows.describe('Pitch parse').addBatch({
  'simple note parse': function () {
    assert.deepEqual(Note.parse('c'), { pc: 'c', acc: '', oct: 4, midi: 60, freq: 261.6255653005986})
  },
  'parse octave option': function () {
    assert.deepEqual(Note.parse('c', 2), { pc: 'c', acc: '', oct: 2, midi: 36, freq: 65.40639132514966})
  },
  'parse returns null': function () {
    assert.deepEqual(Note.parse('c', null, null),
      { pc: 'c', acc: '', oct: 4, midi: 60, freq: 261.6255653005986})
    assert.deepEqual(Note.parse('blah', null, null), null)
  }
}).export(module)
