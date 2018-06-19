### Simple function for masking JSON with a list of JsonPaths

#### Usage
```
const blacklist  = require('jsonpath-blacklist');

let outputJson = blacklist(['path.to[0].some.attribute'], inputJson);
```