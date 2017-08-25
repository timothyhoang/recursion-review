// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var results = [];

  var searchForElementsByClass = function(element) {
    if (element.classList.contains(className)) {
      results.push(element);
    }

    for (let childElement of element.children) {
      searchForElementsByClass(childElement);
    }
  };

  searchForElementsByClass(document.body);

  return results;
};
