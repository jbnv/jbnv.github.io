// returns [1,max) with a strong bias towards the lower numbers.
function powrandom(max) {
  return Math.pow(max,Math.random());
}

function digit(count) {
  if (!count) count = 1;
  outbound = "";
  for (i = 0; i < count; i++) { outbound += Math.floor(10*Math.random()); }
  return outbound;
}

function character(string) {
  return string.charAt(string.length*Math.random());
}


function alphanumeric(options) {

  if (options == null) options = {};

  if (!options.characters) options.characters = "0123456789abcdefghijklmnpqrstuvwxyz";

  var length = 0;
  if (options.count) {
    length = options.count;
  } else {
    if (!options.minlength) options.minlength = 5;
    if (!options.maxlength) options.maxlength = 12;
    length = powrandom(options.maxlength-options.minlength)+options.minlength;
  }

  if (!options.transform) options.transform = function(x) { return x; };

  var outbound = "";
  for (var i = 0; i < length; i++) {
    outbound += character(options.characters);
  }
  return outbound;

}

// Randomize array element order in-place. Durstenfeld shuffle algorithm.
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export { alphanumeric, character, digit, powrandom, shuffle }
