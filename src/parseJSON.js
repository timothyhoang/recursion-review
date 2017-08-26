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
  while (json[++i] !== '"' && i < json.length) {
    if (json[i] === '\\') {
      string = string + json[i++];
    }
    string = string + json[i];
  };
  return string;
};

var nextNonSpaceIndex = function(json, i) {
   while (json[i] === ' ') {
    i++;
  }
  return i;
}

var parseObject = function(json) {
  var obj = {};
  
  if (json.length > 0) {
    var tokens = [];
    var key = '';
    var value = '';

    var i = 0;
    while (i < json.length) {
      i = nextNonSpaceIndex(json, i);
      key = parseString(json.slice(i));
      i += key.length + 3;
      i = nextNonSpaceIndex(json, i);
      
      while (i < json.length) {
        if (json[i] === ',' && tokens.length === 0) {
          obj[key] = parseJSON(value);
          key = '';
          value = '';
          i++;
          break;
        } else if (TOKENS.includes(json[i])) {
          if (tokens.length === 0 || !areComplementaryTokens(tokens[tokens.length - 1], json[i])) {
            tokens.push(json[i]);
          } else {
            tokens.pop();
          }

          value += json[i];
        } else {
          value += json[i];
        }

        i++;
      }
    }

    obj[key] = parseJSON(value);
  }

  return obj;
};

var parseArray = function(json) {
  var arr = [];

  if (json.length > 0) {
    var tokens = [];
    var element = '';

    var i = 0;
    while (i < json.length) {
      if (json[i] === ',' && tokens.length === 0) {
        arr.push(parseJSON(element));
        element = '';
      } else if (TOKENS.includes(json[i])) {
        if (tokens.length === 0 || !areComplementaryTokens(tokens[tokens.length - 1], json[i])) {
          tokens.push(json[i]);
        } else {
          tokens.pop();
        }

        element += json[i];
      } else {
        element += json[i];
      }

      i++;
    }

    arr.push(parseJSON(element));
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
      return parseObject(json.slice(1, json.length - 1));
    } else if (firstChar === '[') {
      return parseArray(json.slice(1, json.length - 1));
    }
  } else {
    return parseElement(json);
  }
};
