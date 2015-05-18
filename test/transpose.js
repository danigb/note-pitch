vows = require('vows');
assert = require('assert');

var pitch = require('..');

vows.describe('Pitch transpose').addBatch({
  "simple note transposition": function() {
    assert.equal(pitch.transpose('c2', 'M2'), 'd2');
    assert.equal(pitch.transpose('c2', 'M16'), 'd4');
    assert.equal(pitch.transpose('e2', 'M2'), 'f#2');
  }
}).export(module);
