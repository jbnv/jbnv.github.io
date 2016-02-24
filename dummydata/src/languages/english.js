import {DummyDataEngine} from "../core/engine"
import {Selector} from "../core/selector"
import {singularOrPlural} from "../util/grammar"
import "../util/extensions"

export class English {

  _data = function() {}
  _this = this;

  // // [adjective phrase, is plural? (default false)]
  // adjectivePhrase = new Selector([
  //   function() { return ["the",singularOrPlural(0.50)]; },
  //   function() { return ["the "+_data("EnglishAdjectives"),singularOrPlural(0.50)]; },
  //   function() { return [_data("EnglishCardinalNumbers"),true]; },
  //   function() {
  //     var number = _data("EnglishCardinalNumbers");
  //     return ["the "+number, number != "one"];
  //   },
  //   function() { return ["the "+_data("EnglishOrdinalNumbers")]; },
  //   function() { return ["some",singularOrPlural(0.50)]; },
  //   function() { return ["some "+_data("EnglishAdjectives"),true]; },
  //   function() { return ["any",true]; },
  //   function() { return ["any "+_data("EnglishAdjectives"),true]; },
  //   function() { return ["many",true]; },
  //   function() { return ["many "+_data("EnglishAdjectives"),true]; },
  //   function() { return ["few",true]; },
  //   function() { return ["few "+_data("EnglishAdjectives"),true]; },
  //   function() { return [_this.maleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [_this.femaleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [_this.surname()+"'s",singularOrPlural(0.50)]; }
  // ]);

  color() {
    var baseColor = _data('EnglishColors');
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
  }

  maleName = new Selector([
    [2,function() {return _data('EnglishMaleNames')}],
    [2,function() {return _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes1')}],
    [2,function() {return _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes2');}],
    function() {return _data('EnglishNamePrefixes2')+_data('EnglishNameSuffixes1');}
  ]);

  femaleName() {
    var selector = Math.random();
    if (selector < 0.8) return _data('EnglishFemaleNames');
    return _this.maleName()+_data('EnglishFeminineSuffixes');
  }

  surname = new Selector([
    [10,function() {return _data('EnglishSurnames')}],
    [4,this.maleName],
    [5,function() {return _this.maleName()+_data('EnglishNameSuffixes1')}],
    [5,function() {return _data('EnglishSurnameNamePrefixes')+_data('EnglishSurnames')}],
    [10,function() {return _data('EnglishSurnameNamePrefixes')+_this.maleName()}],
    [1,function() {return _data('EnglishSurnameNamePrefixes')+_this.maleName()+_data('EnglishNameSuffixes1')}],
  ]);

  maleFullName() {
    return _this.maleName()+" "+_this.surname();
  };

  femaleFullName() {
    return _this.femaleName()+" "+_this.surname();
  };

  // cardinalDirectionsForAddresses = new Selector([
  //   [10,['']],
  //   [4,['N.','S.','E.','W.']],
  //   [1,['NW','NE','SW','SE']]
  // ]);
  //
  // streetName = new Selector([
  //   function() { return _data('EnglishAnimals'); },
  //   function() { return _this.color(); },
  //   function() { return _data('EnglishOrdinalNumbers'); },
  //   function() { return _data('EnglishPlants'); },
  //   function() { return _this.maleName(); },
  //   function() { return _this.femaleName(); },
  //   function() { return _this.surname(); },
  //   function() { return _this.maleFullName(); },
  //   function() { return _this.femaleFullName(); },
  //   function() { return _data('EnglishAdjectives')+' '+_data('EnglishTerrainWords'); },
  //   function() { return _data('EnglishTerrainWords')+['side','view'].randomElement(); }
  // ]);
  //
  // streetAddress() {
  //   var number = Math.floor(Math.pow(100000,Math.random()));
  //   var cardinalDirection = _this.cardinalDirectionsForAddresses();
  //   var streetType = _data('EnglishRoadTypes');
  //   var address
  //     = "" + number + " "
  //     + cardinalDirection + (cardinalDirection == '' ? '' : " ")
  //     + _this.streetName() + " " + streetType;
  //   return address.toTitleCase();
  // }
  //
  // cardinalDirectionsForCity = new Selector([
  //   [10,['']],
  //   [4,['North','South','East','West']],
  //   [1,['Upper','Lower']]
  // ]);
  //
  // cityModifiers = ['town','ton','ville','burg',' City',' Springs',' Heights',' Town'];
  //
  // citySelector = new Selector([
  //   function() { return _this.surname(); },
  //   function() { return _this.surname()+cityModifiers.randomElement(); },
  //   function() { return _this.surname()+cityModifiers.randomElement(); },
  //   function() { return _this.maleName()+cityModifiers.randomElement(); },
  //   function() { return _this.femaleName()+cityModifiers.randomElement(); },
  //   function() { return "Lake "+_this.surname(); },
  //   function() { return "Lake "+_this.maleName(); },
  //   function() { return "Lake "+_this.femaleName(); },
  //   function() { return "Mount "+_this.surname(); },
  //   function() { return "Mount "+_this.maleName(); },
  //   function() { return "Mount "+_this.femaleName(); }
  // ]);
  //
  // city() {
  //   var cardinalDirection = cardinalDirectionsForCity();
  //   var city
  //     = cardinalDirection + (cardinalDirection == '' ? '' : " ")
  //     + _this.citySelector();
  //   return toTitleCase(city);
  // }
  //
  // ipsum_noun_selector = new Selector([
  //   function() { return _data('EnglishAnimals'); }, //TEMP _dataOptions removed from each
  //   function() { return _data('EnglishPlants'); },
  //   function() { return _data('EnglishRoadTypes'); },
  //   function() { return _data('EnglishSubstances'); }
  // ]);
  //
  // ipsum_clause() {
  //   var adjectivePhraseArray = _this.adjectivePhrase();
  //   var _dataOptions = {
  //     partOfSpeech: 'noun',
  //     plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
  //   };
  //   return adjectivePhraseArray[0]+" "+_this.ipsum_noun_selector();
  // }
  //
  // verbSelector(tense) {
  //   return _data('EnglishVerbs',{partOfSpeech:'verb','case':tense});
  // }
  //
  // ipsum_verb = new Selector([
  //   [5, function() { return _this.verbSelector('past');}],
  //   [5, function() {
  //     var selector1 = [
  //       ['','infinitive'],
  //       ['be','past'],
  //       ['be','participle'],
  //       ['have','past'],
  //       ['have been','past'],
  //       ['have been','participle']
  //     ].randomElement();
  //     var outbound =
  //       ['can','could','shall','should','may','might','will','would'].randomElement()
  //       + " " + selector1[0] + (selector1[0] == "" ? "" : " ")
  //       + _this.verbSelector(selector1[1]);
  //     return outbound;
  //   }]
  // ]);
  //
  // ipsum(options) {
  //   var sentenceCount = options == null ? 1 : (options.count || 1);
  //   var sentences = [];
  //   for (var i = 0; i < sentenceCount; i++) {
  //     var sentence = toInitialCase(_this.ipsum_clause()+" "+_this.ipsum_verb()+" "+_this.ipsum_clause()+".")
  //     sentences.push(sentence);
  //   }
  //   return sentences.join(" ");
  // }

  menuItems = [
    ["Male Name", this.maleName],
    ["Female Name", this.femaleName],
    ["Surname", this.surname]
    // ["Male Full Name", maleFullName],
    // ["Female Full Name", femaleFullName],
    // null,
    // ["Color", color],
    // ["Street Address",streetAddress],
    // ["City",city],
    // null,
    // ["Ipsum 1 sentence",ipsum],
    // ["Ipsum 3 sentences",ipsum,{count:3}],
    // ["Ipsum 5 sentences",ipsum,{count:5}]
  ];

  constructor(dd) {
    console.log("english::constructor BEGIN");

    var listOptions = {};

    listOptions.nounOption = {
      partOfSpeech: "noun",
      transform: function(itemArray) {
        if (itemArray.length == 1) {
          itemArray.push(itemArray[0]+"s");
        }
        return itemArray;
      }
    }

    listOptions.verbOption = {
      partOfSpeech: "verb",
      transform: function(itemArray) {
        var outbound = [];
        var stem = itemArray[0];
        if (stem.substr(-3) == "{e}") {
          stem = stem.substr(0,stem.length-3);
          outbound.push(stem+"e");
          outbound.push(stem+"es"); // present singular
          outbound.push(stem+"e"); // present plural
          outbound.push(stem+"ed"); // past
          outbound.push(stem+"ing"); // participle
          return outbound;
        }
        if (stem.substr(-3) == "{y}") {
          stem = stem.substr(0,stem.length-3);
          outbound.push(stem+"y");
          outbound.push(stem+"ies"); // present singular
          outbound.push(stem+"y"); // present plural
          outbound.push(stem+"ied"); // past
          outbound.push(stem+"ying"); // participle
          return outbound;
        }

        outbound.push(stem);
        outbound.push(itemArray[1] || stem+"s"); // present singular
        outbound.push(itemArray[2] || stem); // present plural
        outbound.push(itemArray[3] || stem+"ed"); // past
        outbound.push(itemArray[4] || stem+"ing"); // participle
        return outbound;
      }
    }

    // Download the data files.
    // This needs to be replaced with a call to the JSON file,
    // but the JSON script needs to process the noun and verb options.
    _data = new DummyDataEngine(dd,'Languages','English','txt',listOptions);

    console.log("english::constructor END");
  }
}
