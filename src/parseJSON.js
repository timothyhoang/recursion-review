// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var TOKENS = ['"', '{', '}', '[', ']'];
var TOKEN_MAP = {'"':'"', '{':'}', '[':']'};

var areComplementaryTokens = function(firstChar, lastChar) {
  return TOKENS.includes(firstChar) && TOKEN_MAP[firstChar] === lastChar;
};

var parseElement = function(json) {
  return eval(json);
}

var parseString = function(json) {
  var string = '';
  var i = 0;
  while(json[++i] !== '"' && i < json.length) {
    if (json[i] === '\\') {
      string = string + json[i++];
    }
    string = string + json[i];
  };
  return string;
};

var parseObject = function() {

};

var parseArray = function(json) {
  var arr = [];
  
  var tokens = ['['];
  var element = null;
  var i = 1;
  while (tokens.length > 0 && i < json.length) {
    if (json[i] === '"') {
      element = parseString(json);
      i += element.length;
    } else if (json[i] === ',') {
      arr.push(element);
      break;  
    } else {
      element += json[i];
    }
    break;
  }

  return arr;
};

var parseJSON = function(json) {
  var firstChar = json[0];
  var lastChar = json[json.length - 1];
  if (areComplementaryTokens(firstChar, lastChar)) {
    if (firstChar === '"') {
      return parseString(json);
    } else if (firstChar === '{') {
      return parseObject(json);
    } else if (firstChar === '[') {
      return parseArray(json);
    }
  } else {
    return parseElement(json);
  }
};
