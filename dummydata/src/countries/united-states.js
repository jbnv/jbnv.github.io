import {digit,phoneNumber} from "../util/random"

function _zipCode() {
  return ""+digit(5);
};

function _zipPlus4() {
  return _zipCode()+"-"+digit(4);
};

export default {
    phoneNumber: phoneNumber({format:"0##-####"}),
    phoneNumberWithAreaCode: phoneNumber({format:"###-0##-####"}),
    zipCode: _zipCode,
    zipPlus4: _zipPlus4,

    menuItems: [
      ["0##-####",phoneNumber({format:"0##-####"})],
      ["###-0##-####",phoneNumber({format:"###-0##-####"})],
      ["Zip Code", _zipCode],
      ["Zip+4 Code", _zipPlus4]
    ]
};
