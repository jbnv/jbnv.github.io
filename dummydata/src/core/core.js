import {DummyData} from './data';
import {English} from '../languages/english';
// import {German} from '../languages/german';
// import {Greek} from '../languages/greek';
// import {Japanese} from '../languages/japanese';
// import {Spanish} from '../languages/spanish';
import {UnitedStates} from '../countries/united-states';
// import {Canada} from '../countries/canada';

var _data = new DummyData();

_data.addLanguage({
  'English': new English()
  // 'German': new German(),
  // 'Greek': new Greek(),
  // 'Japanese': new Japanese(),
  // 'Spanish': new Spanish()
});

_data.addCountry({
  'UnitedStates': new UnitedStates()
  // 'Canada': new Canada(),
});

_data.resetMenu();

export { _data };
