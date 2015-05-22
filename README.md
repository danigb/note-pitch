# note-pitch

A js library for note pitch manipulation:

```js
var pitch = require('note-pitch');
var pitch.transpose('e4', 'M2');    // => 'f#4'
var pitch.transpose('c2', ["P1","M2","M3"]) // => ['c2', 'd2', 'e2']
```

Basically this library can do two things:
- Get the pitch number of a note (MIDI number)
- Transpose a note by an interval


## Installation

```bash
npm install note-pitch
```

## API

### pitch(note)

Returns the MIDI number of that note.

With this method you can calculate, for example, if two notes are enharmonic:

```js
function areEnharmonic(noteA, noteB) { return pitch(noteA) === pitch(noteB); }
```

### pitch.semitones(noteA, noteB)

Returns the distance in semitones between noteA and noteB (can be positive or negative number)

### pitch.transpose(note, interval)

Transpose the given note by a interval:

```js
pitch.transpose('g5', 'm3'); // => "bb5";
```

If you skip the note, you get a _transposer_, a function that transpose notes by
a certain interval:

```js
var transposer = pitch.transpose('M2');
transposer('c2'); // => "d2"
transposer('d2'); // => "e2"
transposer('e2'); // => "f#2"
```

Also, you can specify an array of intervals, ideal for building chords or scales:

```js
pitch.transpose('c2', ['P1', 'M2', 'm3']); // => ["c2", "d2", "eb3"]
pitch.transpose('a2', ['P1', 'M3', 'P5']); // => ["a2", "c#3", "e3"]
```

### pitch.interval(noteA, noteB)

Returns the distance between noteA and noteB as an interval string ('P8', 'm-2')

```js
pitch.interval('c2', 'd2'); // => "M2"
```

## License

MIT License
