import { DummyDataEngine } from "../core/engine"
import djoin from "../util/djoin"
import "../util/extensions"

var _data = function() {};
let _enginePromise = new DummyDataEngine('Languages','German','json');
_enginePromise.then(data => _data = data).done();

function _maleName() { return _data('GermanMaleNames',{capitalize:true}); }

function _femaleName() { return _data('GermanFemaleNames',{capitalize:true}); }

function _surname() {
  let prefix = _data('GermanSurnamePrefixes',{capitalize:true});
  let suffix = _data('GermanSurnameSuffixes');
  if (prefix && suffix) return (prefix+suffix);
  return null;
}

function _maleFullName() { return djoin(_maleName," ",_surname); };

function _femaleFullName() { return djoin(_femaleName," ",_surname); };

export default {
  maleName: _maleName,
  femaleName: _femaleName,
  surname: _surname,
  maleFullName: _maleFullName,
  femaleFullName: _femaleFullName,

  menuItems: [
    ["Male Name", _maleName],
    ["Female Name", _femaleName],
    ["Surname", _surname],
    ["Male Full Name", _maleFullName],
    ["Female Full Name", _femaleFullName]
  ]
}
