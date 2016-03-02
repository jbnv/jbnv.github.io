import { DummyDataEngine } from "../core/engine"
import "../util/extensions"

let _data = new DummyDataEngine('Languages','Japanese','json');

function _maleNameSelector() { return _data('JapaneseMaleNames'); };

function _maleName() { return _maleNameSelector().toInitialCase(); }

function _femaleNameSelector() { return _data('JapaneseFemaleNames'); };

function _femaleName() { return _femaleNameSelector().toInitialCase(); }

function _surnameSelector() { return _data('JapaneseSurnamePrefixes')+_data('JapaneseSurnameSuffixes'); }

function _surname() { return _surnameSelector().toInitialCase(); }

function _maleFullName() { return _surname()+" "+_maleName(); };

function _femaleFullName() { return _surname()+" "+_femaleName(); };

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
