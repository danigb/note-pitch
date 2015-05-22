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

pitch.semitones = function(a, b) {
  return pitch(b) - pitch(a);
}

/*
 * pitch.interval
 *
 * find the interval between two notes
 */
var CHANGE = {
  'minor': ['d', 'm', 'M', 'A'],
  'perfect': ['d', 'P', 'A']
}
pitch.interval = function(a, b) {
  var a = Note(a);
  var b = Note(b);
  var semitones = pitch.semitones(a, b);
  var dir = semitones < 0 ? -1 : 1;
  var pitchDistance = dir > 0 ? pitchNum(b) - pitchNum(a) + 1 :
    pitchNum(b) - pitchNum(a) - 8;

  var i = Interval("d" + pitchDistance);
  var octaves = semitones / 12 | 0;
  if (octaves == -1) octaves = 0;
  var difference = dir * (semitones - i.semitones - 12 * octaves);
  var dest = CHANGE[i.type][difference] + (pitchDistance + 7 * octaves);
  return dest;
}


function pitchNum(note) {
  var num = Note(note).pitchClass.charCodeAt(0);
  return (num < 99) ? num + 7 : num;
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
