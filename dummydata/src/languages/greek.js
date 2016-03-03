import { DummyDataEngine } from "../core/engine"
import { Selector } from "../core/selector"
import djoin from "../util/djoin"
import "../util/extensions"

var _data = function() {};
let _enginePromise = new DummyDataEngine('Languages','Greek','json');
_enginePromise.then(data => _data = data).done();

var namePrefixSelector = new Selector([
  [1, function() { return _data('GreekStems')+"o"; }],
  [1, function() { return _data('GreekNumbers'); }],
  [1, function() { return _data('GreekLetters')+"a"; }]
]);

var nameBaseSelector = new Selector([
  [3, function() { return _data('GreekStems'); }],
  [3, function() { return _data('GreekLetters'); }],
  [1, function() { return namePrefixSelector()+_data('GreekStems'); }],
  [1, function() { return namePrefixSelector()+_data('GreekLetters'); }]
]);

var maleSuffixes = ['as','os','es','is','us','ys','on','ander'];

var maleNameSelector = function() { return nameBaseSelector()+maleSuffixes.randomElement(); }

function maleName() { return maleNameSelector().toInitialCase(); }

var femaleSuffixes = ['a','e','o'];

var femaleNameSelector = new Selector([
  [19,function() { return nameBaseSelector()+femaleSuffixes.randomElement(); }],
  function() { return namePrefixSelector()+"meter"; }
]);

function femaleName() { return femaleNameSelector().toInitialCase(); }

var surnameSuffixes = ['os','es','on'];

var surnameSelector = function() { return nameBaseSelector()+surnameSuffixes.randomElement(); }

function surname() { return surnameSelector().toInitialCase(); }

function maleFullName() { return maleName()+" "+surname(); };

function femaleFullName() { return femaleName()+" "+surname(); };

export default {
  maleName: maleName,
  femaleName: femaleName,
  surname: surname,
  maleFullName: maleFullName,
  femaleFullName: femaleFullName,

  menuItems: [
    ["Male Name", maleName],
    ["Female Name", femaleName],
    ["Surname", surname],
    ["Male Full Name", maleFullName],
    ["Female Full Name", femaleFullName],
  ]
}
