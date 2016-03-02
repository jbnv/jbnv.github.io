import {inject} from 'aurelia-framework';
import {Context} from './core/context';
import {DummyData} from './core/data';

import English from './languages/english';
// import German from './languages/german';
// import Greek from './languages/greek';
import Japanese from './languages/japanese';
// import Spanish from './languages/spanish';

import UnitedStates from './countries/united-states';
// import Canada from './countries/canada';

@inject(Context)
export class Demo {

  context = {};
  menu = [];

  populate() {
    this.menu = this._data.resetMenu();
    // menu should be an array, all elements of which should be [title,function] or null.
  }

  constructor(context) {
    console.log("Demo.constructor");
    this.context = new Context();

    this._data = new DummyData(this.context);

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

    this.populate();
  }
}
