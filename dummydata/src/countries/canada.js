import {digit,character} from "../util/random"

postalCodeLetters = "ABCEFGHJKLMNPRSTUVWXY";

function postalCodeLetter() {
  return character(postalCodeLetters);
};

export class Canada {

  postalCode() {
    return postalCodeLetter()+digit()+postalCodeLetter()+" "+digit()+postalCodeLetter()+digit();
  };

  menuItems = [
    ["Postal Code", postalCode]
  ];

  constructor(dd) {

  }

};
