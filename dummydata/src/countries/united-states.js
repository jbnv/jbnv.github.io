import {digit} from "../util/random"

export class UnitedStates {

  zipCode() {
    return ""+digit(5);
  };

  zipPlus4() {
    return zipCode()+"-"+digit(4);
  };

  phoneNumber(options) {
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

  menuItems = [
    ["0##-####",this.phoneNumber({format:"0##-####"})],
    ["###-0##-####",this.phoneNumber({format:"###-0##-####"})],
    ["Zip Code", this.zipCode],
    ["Zip+4 Code", this.zipPlus4]
  ];

  constructor(dd) {

  }

};
