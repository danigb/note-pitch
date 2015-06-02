# note-pitch

[![Code Climate](https://codeclimate.com/github/danigb/note-pitch/badges/gpa.svg)](https://codeclimate.com/github/danigb/note-pitch)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Extends [note-parser](http://github.com/danigb/note-parser) to add note pitch manipulation.

As an extension of note-parser, you can parse notes:

```js
var Note = require('note-pitch');
Note.parse('a4'); // => { pc: 'a', acc: '', oct: 4, midi: 69, freq: 440 }
```

But also you can transpose them:

```js
Note.transpose('e4', 'M2'); // => 'f#4'
Note.transpose('c2', ["P1","M2","M3"]); // => ['c2', 'd2', 'e2']
```

Or find distances (in intervals):

```js
Note.distance('c2', 'd2'); // => 'M2'
Note.distance('c', ['c', 'd', 'eb', 'f', 'g']); // => ['P1', 'M2', 'm3', 'P4', 'P5']
```

## Installation

Install the module: `npm i --save note-pitch` and require it:

```js
var Note = require('note-pitch');
```

If you want to use it inside a browser you will need a node module compatible
packager (like browserify or webpack).

This is part of a higher level library
that performs transpositions (and much more) ready to browser:
[ScoreJs](http://github.com/danigb/ScoreJS)

## API

### Note.parse(note)

Returns the note as parsed object.
See [note-parser](http://github.com/danigb/note-parser) for more information.

### Note.semitones(noteA, noteB)

Returns the distance in semitones between noteA and noteB (can be positive or negative number)

### Note.transpose(note, interval)

Transpose the given note by a interval:

```js
Note.transpose('g5', 'm3'); // => "bb5";
```

If you skip the note, you get a _transposer_, a function that transpose notes by
a certain interval:

```js
var transposer = Note.transpose('M2');
transposer('c2'); // => "d2"
transposer('d2'); // => "e2"
transposer('e2'); // => "f#2"
```

Also, you can specify an array of intervals, ideal for building chords or scales:

```js
Note.transpose('c2', ['P1', 'M2', 'm3']); // => ["c2", "d2", "eb3"]
Note.transpose('a2', ['P1', 'M3', 'P5']); // => ["a2", "c#3", "e3"]
```

### Note.distance(root, notes)

Returns the distance between a root note and a list of notes:

```js
Note.distance('c2', 'd2'); // => "M2"
Note.distance('c2', ['c2', 'd2', 'e2']); // => ['P1', 'M2', 'M3']
```

If you skip the notes, you get a _distancer_, a function that returns the
distance from the root to another note:

```js
var distance = Note.distance('c2');
distance('c2'); // => 'P1'
distance('d2'); // => 'M2'
```

## License

MIT License
