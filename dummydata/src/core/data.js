import Universal from "./universal"

export class DummyData {

  _languages = {};
  _countries = {};

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

  menu(language,country) {

    let menuSpec = [];

    let engine = this._languages[language];
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log(`No engine for language '${language}'.`);
    }

    engine = this._countries[country];
    if (engine) {
      Array.prototype.push.apply(menuSpec, engine.menuItems);
      menuSpec.push(null); // separator
    } else {
      console.log(`No engine for country '${country}'.`);
    }

    Array.prototype.push.apply(menuSpec, Universal.menuItems);

    return menuSpec;
  }
};
