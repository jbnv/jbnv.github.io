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
  menu = [];

  populate() {
    //TODO Wait for the data to actually be available before populating.
    this.menu = this._data.menu(this.context.language,this.context.country);
    // menu should be an array, all elements of which should be [title,function] or null.
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
