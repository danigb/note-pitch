var vows = require('vows')
var assert = require('assert')

var Note = require('..')

vows.describe('Pitch transpose').addBatch({
  'simple note distance': function () {
    assert.equal(Note.semitones('c2', 'd2'), 2)
    assert.equal(Note.semitones('d2', 'c2'), -2)
  },
  'altered note distance': function () {
    assert.equal(Note.semitones('c2', 'g2'), 7)
    assert.equal(Note.semitones('c#2', 'g2'), 6)
    assert.equal(Note.semitones('c#2', 'gb2'), 5)
  },
  'octaves note distance': function () {
    assert.equal(Note.semitones('c2', 'c3'), 12)
    assert.equal(Note.semitones('c2', 'g3'), 19)
    assert.equal(Note.semitones('c3', 'c2'), -12)
    assert.equal(Note.semitones('c3', 'g2'), -5)
  }
}).export(module)
