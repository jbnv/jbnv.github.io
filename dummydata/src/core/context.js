import {bindable} from 'aurelia-framework';
import {DummyData} from './data';

import English from '../languages/english';
import German from '../languages/german';
import Greek from '../languages/greek';
import Japanese from '../languages/japanese';
import Spanish from '../languages/spanish';

import UnitedStates from '../countries/united-states';
import Canada from '../countries/canada';

var _languages = [
  { slug: 'en', title: 'English' },
  { slug: 'de', title: 'German' },
  { slug: 'gk', title: 'Greek' },
  { slug: 'jp', title: 'Japanese' },
  { slug: 'es', title: 'Spanish' }
];

var _countries = [
  { slug: 'us', title: 'United States' },
  { slug: 'ca', title: 'Canada' }
];

export class Context {
  @bindable title = 'Context';

  language = 'en';
  country = 'us';

  languageName = 'English';
  countryName = 'United States';
  ordinal = 0;

  languages = _languages;
  countries = _countries;

  _data = {};

  _callbacks = [];

  _buildData() {
    this._data = new DummyData();

    this._data.addLanguage({
      'en': English,
      'de': German,
      'gk': Greek,
      'jp': Japanese,
      'es': Spanish
    });

    this._data.addCountry({
      'us': UnitedStates,
      'ca': Canada
    });
  }

  menu() {
    return this._data.menu(this.language,this.country);
  }

  subscribe(eventName,callback) {
    this._callbacks.push([eventName,callback]);
  }

  setLanguage(slug) {
    this.language = slug;
    this.languageName = _languages.filter(l => l.slug == slug)[0].title;
    this._callbacks.filter(cb => cb[0] == "setLanguage").forEach(cb => cb[1]());
    this.regenerate();
  }

  setCountry(slug) {
    this.country = slug;
    this.countryName = _countries.filter(l => l.slug == slug)[0].title;
    this._callbacks.filter(cb => cb[0] == "setCountry").forEach(cb => cb[1]());
    this.regenerate();
  }

  regenerate() {
    this._callbacks.filter(cb => cb[0] == "regenerate").forEach(cb => cb[1]());
  }

  constructor() {
    this._buildData();
  }
}
