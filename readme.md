### Simple function for masking JSON with a list of JsonPaths

#### Usage
```
const blacklist  = require('jsonpath-blacklist');

let outputJson = blacklist(['path.to[0].some.attribute'], inputJson);
```
[![Run on Repl.it](https://repl.it/badge/github/billykong/jsonpath-blacklist)](https://repl.it/github/billykong/jsonpath-blacklist)