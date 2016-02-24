import _data from './core/core';

export class App {

  language = 'English';
  country = 'UnitedStates';
  ordinal = 0;
  menu = [];

  populateDemo() {
    var menu = _data.resetMenu();
    // menu should be an array, all elements of which should be [title,function] or null.
  }

  submit() {

    // Fix ordinal.
    var float = parseFloat(ordinal);
    if (Number.isNaN(float)) float = 0;
    ordinal = float;

    populateDemo();

  }

  constructor() {
    console.log("App.constructor(): BEGIN");
    this.populateDemo();
    console.log("App.constructor(): END");
  }
}
