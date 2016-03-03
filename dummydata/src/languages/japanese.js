import { DummyDataEngine } from "../core/engine"
import djoin from "../util/djoin"
import "../util/extensions"

var _data = function() {};
let _enginePromise = new DummyDataEngine('Languages','Japanese','json');
_enginePromise.then(data => _data = data).done();

function _maleName() { return _data('JapaneseMaleNames',{capitalize:true}); }

function _femaleName() { return _data('JapaneseFemaleNames',{capitalize:true}); }

function _surname() {
  let prefix = _data('JapaneseSurnamePrefixes',{capitalize:true});
  let suffix = _data('JapaneseSurnameSuffixes');
  if (prefix && suffix) return (prefix+suffix);
  return null;
}

function _maleFullName() { return djoin(_surname," ",_maleName); };

function _femaleFullName() { return djoin(_surname," ",_femaleName); };

export default {
  maleName: _maleName,
  femaleName: _femaleName,
  surname: _surname,
  maleFullName: _maleFullName,

  menuItems: [
    ["Male Name", _maleName],
    ["Female Name", _femaleName],
    ["Surname", _surname],
    ["Male Full Name", _maleFullName],
    ["Female Full Name", _femaleFullName]
  ]
}
