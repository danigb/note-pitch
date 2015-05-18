vows = require('vows');
assert = require('assert');

var pitch = require('..');

vows.describe('Pitch transpose').addBatch({
  "simple note transposition": function() {
    assert.equal(pitch.transpose('c2', 'M2'), 'd2');
    assert.equal(pitch.transpose('c2', 'M16'), 'd4');
    assert.equal(pitch.transpose('e2', 'M2'), 'f#2');
    assert.equal(pitch.transpose('a2', 'M3'), 'c#3');
  },
  "return a tranposer": function() {
    t = pitch.transpose('M2');
    assert.equal(typeof(t), 'function');
    assert.equal(t('c2'), 'd2');
    assert.equal(t('d2'), 'e2');
    assert.equal(t('e2'), 'f#2');
  },
  "transpose with an array of intervals": function() {
    scale = pitch.transpose('a2', ["P1","M2","M3"]);
    assert.deepEqual(scale, [ 'a2', 'b2', 'c#3' ]);
  }
}).export(module);
