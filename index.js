'use strict';

var intervalo = require('intervalo');
var parse = require('note-parse');

var PITCH_CLASSES = "cdefgabcdefgab";
var SEMITONES = {c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }
var ACCIDENTALS = ['bb', 'b', '', '#', '##']

var pitch = function(note) {
  note = parse(note);
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
  note = parse(note);
  interval = intervalo(interval);
  var simple = interval.simple();
  var pitchIndex = PITCH_CLASSES.indexOf(note.pitchClass);
  var pitchClass = PITCH_CLASSES[pitchIndex + simple.number() - 1];
  var dest = parse(pitchClass + (note.octave + interval.octaves()));
  var difference = interval.semitones() - (pitch(dest) - pitch(note));
  var reduced = difference % 12;
  var octaves = (difference - reduced) / 12;
  var accidentals = ACCIDENTALS[reduced + 2];
  return dest.pitchClass + accidentals + (dest.octave + octaves);
}

module.exports = pitch;
