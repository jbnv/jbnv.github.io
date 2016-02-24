import {Universal} from "./universal"

export class DummyData {

  _languages = {};
  _countries = {};

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  addLanguage(p1,p2) {
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        _languages = p1;
        return;
    }
    _languages[p1] = p2;
  }

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  addCountry(p1,p2) {
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        _countries = p1;
        return;
    }
    _countries[p1] = p2;
  }

  languageName(newLanguage) {
    if (newLanguage) {
      _context("language")(newLanguage);
      this.resetMenu();
      return newLanguage;
    }
    return _context("language")();
  }

  countryName(newCountry) {
    if (newCountry) {
      _context("country")(newCountry);
      this.resetMenu();
      return newCountry;
    }
    return _context("country")();
  }

  language(name) {
    return _languages[name || this.languageName()];
  }

  country(name){
    return _countries[name || this.countryName()];
  }

  resetMenu() {

    var menuSpec = [];

    engine = this.language();
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log("_languages: No engine for "+this.languageName()+".");
    }

    engine = this.country();
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log("_countries: No engine for "+this.countryName()+".");
    }

    universal = new Universal()
    Array.prototype.push.apply(menuSpec, universal.menuItems);

    return menuSpec;
  }
};
