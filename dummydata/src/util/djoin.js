// A function for building dummy-data results.

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Specialized function that builds a string based on its components.
// If a parameter is a function, evaluate it.
// If a parameter is a string, concatenate it.
// If any parameter is null, make the whole thing null;
export default function() {
  let outbound = "";
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    if (isFunction(arg)) {
      arg = arg();
    }
    if (arg === null) {
      return null;
    }
    outbound = outbound + arg;
  }
  return outbound;
};
