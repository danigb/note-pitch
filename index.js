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
  note = parse(note);
  interval = intervalo(interval);
  var simple = interval.simple();
  var pitchClass = pitchShift(note.pitchClass, simple.number());
  var dest = parse(pitchClass + (note.octave + interval.octaves()));
  var difference = interval.semitones() - (pitch(dest) - pitch(note));
  var accidentals = ACCIDENTALS[difference + 2];
  return dest.pitchClass + accidentals + dest.octave;
}

module.exports = pitch;

function pitchShift(pitchClass, num) {
  var i = PITCH_CLASSES.indexOf(pitchClass);
  return PITCH_CLASSES[i + num - 1];
}
