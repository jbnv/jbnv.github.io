import {inject} from 'aurelia-framework';
import {DummyData} from './core/data';

import English from './languages/english';
// import German from './languages/german';
// import Greek from './languages/greek';
import Japanese from './languages/japanese';
// import Spanish from './languages/spanish';

import UnitedStates from './countries/united-states';
import Canada from './countries/canada';

export class Demo {

  context = {};

  // array of {title,value,showSpinner} or null (separator).
  menu = [];

  // Evaluate each item in the menu, and
  populate() {
    //TODO Wait for the data to actually be available before populating.
    let menuWithFunctions = this._data.menu(this.context.language,this.context.country);
    let evaluatedMenu = [];
    menuWithFunctions.forEach(function(e) {
      if (e) {
        let value = e[1]();
        evaluatedMenu.push({
          title: e[0],
          value: value,
          showSpinner: !value
        });
      } else {
        evaluatedMenu.push(null);
      }
    });
    this.menu = evaluatedMenu;
  }

  constructor() {
    this._data = new DummyData();

    this._data.addLanguage({
      'en': English,
      // 'de': German,
      // 'gk': Greek,
      'jp': Japanese,
      // 'es': Spanish
    });

    this._data.addCountry({
      'us': UnitedStates,
      'ca': Canada
    });
  }

  bind(bindingContext, overrideContext) {
    this.context = overrideContext.bindingContext.context;
    this.context.subscribe("regenerate",() => this.populate());
  }

  attached() {
    this.populate();
  }
}
