// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyElement = function(element, hasWrapper) {
  if (typeof element === 'undefined' || typeof element === 'function') {
    if (hasWrapper) {
      return 'null';
    } else {
      return undefined;
    }
  } else if (typeof element === 'string') {
    if (hasWrapper) {
      return element;
    } else {
      return '"' + element + '"';
    }
  } else {
    return '' + element;
  }
};

var stringifyArray = function(arr) {
  var elements = [];
  for (let element of arr) {
    elements.push(stringifyJSON(element));
  }
  return '[' + elements.join(',') + ']';
};

var stringifyObject = function(obj) {
  var elements = [];
  for (var key in obj) {
    if (obj[key] !== undefined && typeof obj[key] !== 'function') {
      elements.push('"' + key + '":' + stringifyJSON(obj[key]));
    }
  }
  return '{' + elements.join(',') + '}';
}

var stringifyJSON = function(obj) {
  var stringifyJSON = function(obj, hasWrapper) {
    if (Array.isArray(obj)) {
      return stringifyArray(obj, true);
    } else if (typeof obj === 'object' && obj !== null) {
      return stringifyObject(obj, true);
    } else {
      return stringifyElement(obj, hasWrapper);
    }  
  }

  return stringifyJSON(obj);
};
