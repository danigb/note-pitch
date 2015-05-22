vows = require('vows');
assert = require('assert');

var pitch = require('..');

vows.describe('Pitch interval').addBatch({
  "intervals up": function() {
    var pitches = "c d e f g a b".split(' ');
    var intervals = pitches.map(function(p) {
      return pitch.interval("c", p);
    });
    assert.deepEqual(intervals, ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']);
  },
  "intervals down": function() {
    var pitches = "c d e f g a b".split(' ');
    var intervals = pitches.map(function(p) {
      return pitch.interval("c3", p);
    });
    assert.deepEqual(intervals, ['P-8', 'm-7', 'm-6', 'P-5', 'P-4', 'm-3', 'm-2']);
  },
  "octave intervals up": function() {
    var pitches = "c d e f g a b".split(' ');
    var intervals = pitches.map(function(p) {
      return pitch.interval("c1", p);
    });
    assert.deepEqual(intervals, ['P8', 'M9', 'M10', 'P11', 'P12', 'M13', 'M14']);
  },

}).export(module);
