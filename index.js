'use strict';

var Interval = require('interval-parser');
var Note = require('note-parser');

var PITCH_CLASSES = "cdefgabcdefgab";
var SEMITONES = {c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }
var ACCIDENTALS = ['bb', 'b', '', '#', '##']

var pitch = function(note) {
  note = Note(note);
  var alter = note.accidentals.length;
  if(note.accidentals[0] === 'b') alter = -1 * alter;
  return SEMITONES[note.pitchClass] + alter + 12 * (note.octave + 1);
}

pitch.transpose = function(note, interval) {
  if(arguments.length == 1) {
    interval = note;
    return function(note) {
      return transpose(note, interval);
    }
  } else if (Array.isArray(interval)) {
    return interval.map(function(i) {
      return transpose(note, i);
    });
  } else {
    return transpose(note, interval);
  }
}

function transpose(note, interval) {
  note = Note(note);
  interval = Interval(interval);
  var pitchIndex = PITCH_CLASSES.indexOf(note.pitchClass);
  var pitchClass = PITCH_CLASSES[pitchIndex + interval.simple - 1];
  var dest = Note(pitchClass + (note.octave + interval.octaves));
  var difference = interval.semitones - (pitch(dest) - pitch(note));
  var reduced = difference % 12;
  var octaves = (difference - reduced) / 12;
  var accidentals = ACCIDENTALS[reduced + 2];
  return dest.pitchClass + accidentals + (dest.octave + octaves);
}

module.exports = pitch;
