'use strict'

var Interval = require('interval-parser')
var parse = require('note-parser')

var Note = {}

Note.parse = function (note) {
  return parse.apply(null, arguments)
}

Note.semitones = function (a, b) {
  return parse(b).midi - parse(a).midi
}

/*
 * pitch.distance
 *
 * return intervals between notes
 */
Note.distance = function (root, notes) {
  root = parse(root)
  if (arguments.length === 1) {
    return function (note) {
      return interval(root, note)
    }
  } else if (Array.isArray(notes)) {
    return notes.map(function (i) {
      return interval(root, i)
    })
  } else {
    return interval(root, notes)
  }
}

Note.transpose = function (note, interval) {
  if (arguments.length === 1) {
    interval = note
    return function (note) {
      return transpose(note, interval)
    }
  } else if (Array.isArray(interval)) {
    return interval.map(function (i) {
      return transpose(note, i)
    })
  } else {
    return transpose(note, interval)
  }
}

var CHANGE = {
  'minor': ['d', 'm', 'M', 'A'],
  'perfect': ['d', 'P', 'A']
}
function interval (a, b) {
  a = parse(a)
  b = parse(b)
  var semitones = b.midi - a.midi
  var dir = semitones < 0 ? -1 : 1
  var pitchDistance = pitchDist(a, b) + dir
  if (dir < 0) pitchDistance -= 7

  var i = Interval('d' + pitchDistance)
  var octaves = semitones / 12 | 0
  if (octaves === -1) octaves = 0
  var difference = dir * (semitones - i.semitones - 12 * octaves)
  var dest = CHANGE[i.type][difference] + (pitchDistance + 7 * octaves)
  return dest
}

function pitchDist (a, b) {
  var first = PITCH_CLASSES.indexOf(parse(a).pc)
  var second = PITCH_CLASSES.indexOf(parse(b).pc, first)
  return second - first
}

var PITCH_CLASSES = 'cdefgabcdefgab'
var ACCIDENTALS = ['bb', 'b', '', '#', '##']
function transpose (note, interval) {
  note = parse(note, null, null)
  if (!note) return null;
  interval = Interval(interval)
  var pitchIndex = PITCH_CLASSES.indexOf(note.pc)
  var pc = PITCH_CLASSES[pitchIndex + interval.simple - 1]
  var dest = parse(pc + (note.oct + interval.octaves))
  var difference = interval.semitones - (dest.midi - note.midi)
  var reduced = difference % 12
  var octaves = (difference - reduced) / 12
  var accidentals = ACCIDENTALS[reduced + 2]
  return dest.pc + accidentals + (dest.oct + octaves)
}

module.exports = Note
