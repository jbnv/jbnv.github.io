import Universal from "./universal"

export class DummyData {

  _languages = {};
  _countries = {};
  _context =  {}

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  addLanguage(p1,p2) {
    //console.log("DummyData.addLanguage",p1,p2);
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        this._languages = p1;
        return;
    }
    this._languages[p1] = p2;
  }

  // p1: object defining the set of languages or name of language
  // p2: (if p1 == name of language) language object
  addCountry(p1,p2) {
    //console.log("DummyData.addCountry",p1,p2);
    if (p1 == null) return;
    if (typeof p1 === 'object') {
        this._countries = p1;
        return;
    }
    this._countries[p1] = p2;
  }

  languageName(name) {
    if (name) {
      this._context.language = name;
      this.resetMenu();
      return newLanguage;
    }
    return this._context.language;
  }

  countryName(name) {
    if (name) {
      this._context.country = name
      this.resetMenu();
      return newCountry;
    }
    return this._context.country;
  }

  language(name) {
    return this._languages[name || this.languageName()];
  }

  country(name){
    return this._countries[name || this.countryName()];
  }

  resetMenu() {

    let menuSpec = [];

    let engine = this.language();
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

    Array.prototype.push.apply(menuSpec, Universal.menuItems);

    return menuSpec;
  }

  constructor(context) {
    this._context = context;
  }
};
