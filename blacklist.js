function toBlacklist(blacklist, inputJSON) {
  if (blacklist) {
    outputJSON = blacklist.reduce((json, rule) => {
      rule.split(".").reduce((json, fragment, currentIndex, array) => {
        let isLastFragment = currentIndex == (array.length - 1);
        let arrayMatches = fragment.match(/^([^\[\]]+)\[(\d+)\]/);
        if (arrayMatches) {
          return isLastFragment ? (json[arrayMatches[1]][arrayMatches[2]] = undefined) : json[arrayMatches[1]][arrayMatches[2]];
        } else {
          return isLastFragment ? (json[fragment] = undefined) : json[fragment];
        }
      }, json);
      return json;
    }, inputJSON)
  }
  return outputJSON;
}

module.exports = toBlacklist;