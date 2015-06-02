var vows = require('vows')
var assert = require('assert')

var pitch = require('..')

vows.describe('Pitch transpose').addBatch({
  'note pitches': function () {
    assert.equal(pitch('a0'), 21)
    assert.equal(pitch('c2'), 36)
    assert.equal(pitch('c#2'), 37)
    assert.equal(pitch('db2'), 37)
  }
}).export(module)
