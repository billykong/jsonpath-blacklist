/**
  options = {
    replacement: undefined, // or any string, do not include this key if you want ot omit the masked entirely
    deepCopy: true
  };
*/
function blacklist(jsonPaths, inputJSON, options) { 
  options = options || {};
  if (options.deepCopy) {
    inputJSON = JSON.parse(JSON.stringify(inputJSON)); // TODO: catch for cyclic reference
  }

  jsonPaths = jsonPaths.sort().reverse();
  if (jsonPaths) {
    outputJSON = jsonPaths.reduce((json, rule) => { // check if a while loop is easier to read
      rule.split(".").reduce((json, fragment, currentIndex, array) => { // handle jsonPath subpath by subpath
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
  return outputJSON;
}

module.exports = blacklist;