### Simple function for masking JSON with a list of JsonPaths

#### Usage
```JavaScript
var blacklist  = require('jsonpath-blacklist');

var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};

var outputJSON = blacklist(['b.c[1]', 'b.c[2]'], inputJSON);
console.log(outputJSON);
// { a: 'keep', b: { c: ['keep'] }}

// Note that inputJSON is also changed.
console.log(inputJSON);
// { a: 'keep', b: { c: ['keep'] }}

// Object
outputJSON = blacklist(['b.c'], inputJSON);
console.log(outputJSON);
// { a: 'keep', b: {}}

// Attribute
outputJSON = blacklist(['a'], inputJSON);
console.log(outputJSON);
// { b: {}}
```

To avoid modification to the input, we can use an options argument:
```JavaScript
var blacklist  = require('jsonpath-blacklist');

var options = { deepCopy: true }
var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};

var outputJSON = blacklist(['b.c[1]', 'b.c[2]'], inputJSON);
console.log(outputJSON);
// { a: 'keep', b: { c: ['keep'] }}

console.log(inputJSON);
// { a: 'keep', b: { c: ['keep', 'remove', 'remove']}}
```

You can also replace the masked jsonpath is a string:
```JavaScript
var blacklist  = require('jsonpath-blacklist');

var options = { replacement: '<_masked_>' }
var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};

var outputJSON = blacklist(['b.c[1]', 'b.c[2]'], inputJSON);
console.log(outputJSON);
// { a: 'keep', b: { c: ['keep', '<_masked_>', '<_masked_>'] }}
```

[![Run on Repl.it](https://repl.it/badge/github/billykong/jsonpath-blacklist)](https://repl.it/github/billykong/jsonpath-blacklist)