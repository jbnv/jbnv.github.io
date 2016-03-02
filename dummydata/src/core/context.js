import {DummyData} from './data';

import English from '../languages/english';
// import {German} from '../languages/german';
// import {Greek} from '../languages/greek';
import Japanese from '../languages/japanese';
// import {Spanish} from '../languages/spanish';

import UnitedStates from '../countries/united-states';
// import {Canada} from '../countries/canada';

import {bindable} from 'aurelia-framework';

var _languages = [
  { slug: 'en', title: 'English' },
  { slug: 'jp', title: 'Japanese' }
];

var _countries = [
  { slug: 'us', title: 'United States' },
  { slug: 'ca', title: 'Canada' }
];

function _languageItemToRoute(item) {
  return { route: 'l/'+item.slug, name: slug.title, title: slug.title, nav: true };
}

function _countryItemToRoute(item) {
  return { route: 'c/'+item.slug, name: slug.title, title: slug.title, nav: true };
}

export class Context {
  @bindable title = 'Context';

  language = '';
  country = '';

  languageName = 'English';
  countryName = 'United States';
  ordinal = 0;

  languages = _languages;
  countries = _countries;

  populateDemo() {
    this.menu = this._data.resetMenu();
    // menu should be an array, all elements of which should be [title,function] or null.
  }

  constructor() {

    this._data = new DummyData(this);

    this._data.addLanguage({
      'English': English,
      // 'German': new German(),
      // 'Greek': new Greek(),
      'Japanese': Japanese,
      // 'Spanish': new Spanish()
    });

    this._data.addCountry({
      'UnitedStates': UnitedStates
      // 'Canada': new Canada(),
    });

    this.populateDemo();

  }
}

/*

export class App {

  _data = {};

  _model = {
    language: 'Japanese',
    country: 'UnitedStates',
    ordinal: 0
  };

  menu = [];


  regenerate() {
    console.log("regenerate");
    let model = this._model;

    // Fix ordinal.
    var float = parseFloat(model.ordinal);
    if (Number.isNaN(float)) float = 0;
    model.ordinal = float;

    this.populateDemo();

  }

}

*/
