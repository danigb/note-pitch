vows = require('vows');
assert = require('assert');

var pitch = require('..');
function semitones(a, b) { return pitch(b) - pitch(a); }

vows.describe('Pitch transpose').addBatch({
  "simple note distance": function() {
    assert.equal(semitones('c2', 'd2'), 2);
    assert.equal(semitones('d2', 'c2'), -2);
  },
  "altered note distance": function() {
    assert.equal(semitones('c2', 'g2'), 7);
    assert.equal(semitones('c#2', 'g2'), 6);
    assert.equal(semitones('c#2', 'gb2'), 5);
  },
  "octaves note distance": function() {
    assert.equal(semitones('c2', 'c3'), 12);
    assert.equal(semitones('c2', 'g3'), 19);
    assert.equal(semitones('c3', 'c2'), -12);
    assert.equal(semitones('c3', 'g2'), -5);
  }
}).export(module);
