import {digit,character,phoneNumber} from "../util/random"

var _postalCodeLetters = "ABCEFGHJKLMNPRSTUVWXY";

function _postalCodeLetter() {
  return character(_postalCodeLetters);
};

function _postalCode() {
  return _postalCodeLetter()+digit()+_postalCodeLetter()+" "+digit()+_postalCodeLetter()+digit();
};

export default {
  phoneNumber: phoneNumber({format:"0##-####"}),
  phoneNumberWithAreaCode: phoneNumber({format:"###-0##-####"}),
  postalCode: _postalCode,

  menuItems: [
    ["0##-####",phoneNumber({format:"0##-####"})],
    ["###-0##-####",phoneNumber({format:"###-0##-####"})],
    ["Postal Code", _postalCode]
  ]
};
