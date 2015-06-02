var vows = require('vows')
var assert = require('assert')

var pitch = require('..')

vows.describe('Pitch distance').addBatch({
  'test basics': function () {
    assert.equal(pitch.distance('a2', 'c#3'), 'M3')
    assert.equal(pitch.distance('a3', 'a2'), 'P-8')
  },
  'distances': function () {
    var intervals = pitch.distance('a2', ['a2', 'c#3', 'e3', 'g#3'])
    assert.deepEqual(intervals, ['P1', 'M3', 'P5', 'M7'])
  },
  'intervals up': function () {
    var pitches = 'c d e f g a b'.split(' ')
    var intervals = pitches.map(function (p) {
      return pitch.distance('c', p)
    })
    assert.deepEqual(intervals, ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'])
  },
  'intervals down': function () {
    var pitches = 'c d e f g a b'.split(' ')
    var intervals = pitches.map(function (p) {
      return pitch.distance('c3', p)
    })
    assert.deepEqual(intervals, ['P-8', 'm-7', 'm-6', 'P-5', 'P-4', 'm-3', 'm-2'])
  },
  'octave intervals up': function () {
    var pitches = 'c d e f g a b'.split(' ')
    var intervals = pitches.map(function (p) {
      return pitch.distance('c1', p)
    })
    assert.deepEqual(intervals, ['P8', 'M9', 'M10', 'P11', 'P12', 'M13', 'M14'])
  }
}).export(module)
