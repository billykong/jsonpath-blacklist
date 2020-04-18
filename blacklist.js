// allow options argument for removing keys entirely, or to provide a replacement key
// allow options for changing the object in place or return a deep copied object, except for cyclic reference objects
/**
  options = {
    replacement: undefined, // or any string
    deepCopy: true
  };
*/
function blacklist(jsonPaths, inputJSON, options) { 
  if (options.deepCopy) {
    inputJSON = JSON.parse(JSON.stringify(inputJSON));
  }

  jsonPaths = jsonPaths.sort().reverse();
  if (jsonPaths) {
    outputJSON = jsonPaths.reduce((json, rule) => { // check if a while loop is easier to read
      // console.log('json: ' + JSON.stringify(json))
      // console.log('rule: ' + JSON.stringify(rule));
      rule.split(".").reduce((json, fragment, currentIndex, array) => { // handle jsonPath subpath by subpath
        // console.log('array: ' + JSON.stringify(array))
        let isLastFragment = currentIndex == (array.length - 1); // variable name `fragment` is difficult to understand
        let arrayMatches = fragment.match(/^([^\[\]]+)\[(\d+)\]/);
        if (arrayMatches) {
          if (isLastFragment) {
            if (options.hasOwnProperty('replacement')) {
              json[arrayMatches[1]][arrayMatches[2]] = options.replacement;
            } else {
              json[arrayMatches[1]][arrayMatches[2]] = undefined;
              json[arrayMatches[1]] = json[arrayMatches[1]].filter(v => v); //remove undefined/null values from array
            }
          } else {
            return json[arrayMatches[1]][arrayMatches[2]];
          }
        } else {
          if (options.hasOwnProperty('replacement')) {
            return isLastFragment ? (json[fragment] = options.replacement) : json[fragment];
          } else {
            return isLastFragment ? (delete json[fragment]) : json[fragment];
          }
        }
      }, json);
      return json;
    }, inputJSON)
  }
  // console.log(outputJSON)
  return outputJSON;
}

module.exports = blacklist;