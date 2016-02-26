import {DummyData} from './core/data';

import {English} from './languages/english';
// import {German} from './languages/german';
// import {Greek} from './languages/greek';
// import {Japanese} from './languages/japanese';
// import {Spanish} from './languages/spanish';

import {UnitedStates} from './countries/united-states';
// import {Canada} from './countries/canada';

export class App {

  _data = {};

  _model = {
    language: 'English',
    country: 'UnitedStates',
    ordinal: 0
  };

  menu = [];

  populateDemo() {
    console.log("App.populateDemo(): BEGIN");
    this.menu = this._data.resetMenu();
    // menu should be an array, all elements of which should be [title,function] or null.
    console.log("App.populateDemo(): END");
  }

  submit() {
    model = this._model;

    // Fix ordinal.
    var float = parseFloat(model.ordinal);
    if (Number.isNaN(float)) float = 0;
    model.ordinal = float;

    this.populateDemo();

  }

  constructor() {
    //console.log("App.constructor(): BEGIN",DummyData);

    this._data = new DummyData(this._model);

    this._data.addLanguage({
      'English': new English()
      // 'German': new German(),
      // 'Greek': new Greek(),
      // 'Japanese': new Japanese(),
      // 'Spanish': new Spanish()
    });

    this._data.addCountry({
      'UnitedStates': new UnitedStates()
      // 'Canada': new Canada(),
    });

    this._data.resetMenu();

    this.populateDemo();

    //console.log("App.constructor(): END");
  }
}
