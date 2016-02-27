import {digit} from "../util/random"

function _zipCode() {
  return ""+digit(5);
};

function _zipPlus4() {
  return _zipCode()+"-"+digit(4);
};

function _phoneNumber(options) {
  return function() {
    if (options == null) options = {};
    if (!options.format) options.format = "0##-####";
    var result = "";
    for (var i = 0; i < options.format.length; i++) {
      if (options.format[i] == '#') {
        result += digit();
      } else {
        result += options.format[i];
      }
    }
    return result;
  };
}

export default {
    phoneNumber: _phoneNumber,
    zipCode: _zipCode,
    zipPlus4: _zipPlus4,

    menuItems: [
      ["0##-####",_phoneNumber({format:"0##-####"})],
      ["###-0##-####",_phoneNumber({format:"###-0##-####"})],
      ["Zip Code", _zipCode],
      ["Zip+4 Code", _zipPlus4]
    ]
};
