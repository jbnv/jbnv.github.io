import { DummyDataEngine } from "../core/engine"
import { Selector } from "../core/selector"
import { singularOrPlural } from "../util/grammar"
import "../util/extensions"
import { autobind } from 'core-decorators';

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
let data = new DummyDataEngine('Languages','English','txt',listOptions);


function _color() {
    var baseColor = data('EnglishColors');
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
}

let _maleName = new Selector([
  [2,() => data('EnglishMaleNames')],
  [2,() => data('EnglishNamePrefixes1')+data('EnglishNameSuffixes1')],
  [2,() => data('EnglishNamePrefixes1')+data('EnglishNameSuffixes2')],
  () => data('EnglishNamePrefixes2')+data('EnglishNameSuffixes1')
])

  // // [adjective phrase, is plural? (default false)]
  // adjectivePhrase = new Selector([
  //   function() { return ["the",singularOrPlural(0.50)]; },
  //   function() { return ["the "+data("EnglishAdjectives"),singularOrPlural(0.50)]; },
  //   function() { return [data("EnglishCardinalNumbers"),true]; },
  //   function() {
  //     var number = data("EnglishCardinalNumbers");
  //     return ["the "+number, number != "one"];
  //   },
  //   function() { return ["the "+data("EnglishOrdinalNumbers")]; },
  //   function() { return ["some",singularOrPlural(0.50)]; },
  //   function() { return ["some "+data("EnglishAdjectives"),true]; },
  //   function() { return ["any",true]; },
  //   function() { return ["any "+data("EnglishAdjectives"),true]; },
  //   function() { return ["many",true]; },
  //   function() { return ["many "+data("EnglishAdjectives"),true]; },
  //   function() { return ["few",true]; },
  //   function() { return ["few "+data("EnglishAdjectives"),true]; },
  //   function() { return [this.maleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [this.femaleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [this.surname()+"'s",singularOrPlural(0.50)]; }
  // ]);


  // femaleName() {
  //   var selector = Math.random();
  //   if (selector < 0.8) return data('EnglishFemaleNames');
  //   return this.maleName()+data('EnglishFeminineSuffixes');
  // }
  //
  // surname = new Selector([
  //   [10,function() {return data('EnglishSurnames')}],
  //   [4,this.maleName],
  //   [5,function() {return this.maleName()+data('EnglishNameSuffixes1')}],
  //   [5,function() {return data('EnglishSurnameNamePrefixes')+data('EnglishSurnames')}],
  //   [10,function() {return data('EnglishSurnameNamePrefixes')+this.maleName()}],
  //   [1,function() {return data('EnglishSurnameNamePrefixes')+this.maleName()+data('EnglishNameSuffixes1')}],
  // ]);
  //
  // maleFullName() {
  //   return this.maleName()+" "+this.surname();
  // };
  //
  // femaleFullName() {
  //   return this.femaleName()+" "+this.surname();
  // };

  // cardinalDirectionsForAddresses = new Selector([
  //   [10,['']],
  //   [4,['N.','S.','E.','W.']],
  //   [1,['NW','NE','SW','SE']]
  // ]);
  //
  // streetName = new Selector([
  //   function() { return data('EnglishAnimals'); },
  //   function() { return this.color(); },
  //   function() { return data('EnglishOrdinalNumbers'); },
  //   function() { return data('EnglishPlants'); },
  //   function() { return this.maleName(); },
  //   function() { return this.femaleName(); },
  //   function() { return this.surname(); },
  //   function() { return this.maleFullName(); },
  //   function() { return this.femaleFullName(); },
  //   function() { return data('EnglishAdjectives')+' '+data('EnglishTerrainWords'); },
  //   function() { return data('EnglishTerrainWords')+['side','view'].randomElement(); }
  // ]);
  //
  // streetAddress() {
  //   var number = Math.floor(Math.pow(100000,Math.random()));
  //   var cardinalDirection = this.cardinalDirectionsForAddresses();
  //   var streetType = data('EnglishRoadTypes');
  //   var address
  //     = "" + number + " "
  //     + cardinalDirection + (cardinalDirection == '' ? '' : " ")
  //     + this.streetName() + " " + streetType;
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
  //   function() { return this.surname(); },
  //   function() { return this.surname()+cityModifiers.randomElement(); },
  //   function() { return this.surname()+cityModifiers.randomElement(); },
  //   function() { return this.maleName()+cityModifiers.randomElement(); },
  //   function() { return this.femaleName()+cityModifiers.randomElement(); },
  //   function() { return "Lake "+this.surname(); },
  //   function() { return "Lake "+this.maleName(); },
  //   function() { return "Lake "+this.femaleName(); },
  //   function() { return "Mount "+this.surname(); },
  //   function() { return "Mount "+this.maleName(); },
  //   function() { return "Mount "+this.femaleName(); }
  // ]);
  //
  // city() {
  //   var cardinalDirection = cardinalDirectionsForCity();
  //   var city
  //     = cardinalDirection + (cardinalDirection == '' ? '' : " ")
  //     + this.citySelector();
  //   return toTitleCase(city);
  // }
  //
  // ipsum_noun_selector = new Selector([
  //   function() { return data('EnglishAnimals'); }, //TEMP _dataOptions removed from each
  //   function() { return data('EnglishPlants'); },
  //   function() { return data('EnglishRoadTypes'); },
  //   function() { return data('EnglishSubstances'); }
  // ]);
  //
  // ipsum_clause() {
  //   var adjectivePhraseArray = this.adjectivePhrase();
  //   var _dataOptions = {
  //     partOfSpeech: 'noun',
  //     plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
  //   };
  //   return adjectivePhraseArray[0]+" "+this.ipsum_noun_selector();
  // }
  //
  // verbSelector(tense) {
  //   return data('EnglishVerbs',{partOfSpeech:'verb','case':tense});
  // }
  //
  // ipsum_verb = new Selector([
  //   [5, function() { return this.verbSelector('past');}],
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
  //       + this.verbSelector(selector1[1]);
  //     return outbound;
  //   }]
  // ]);
  //
  // ipsum(options) {
  //   var sentenceCount = options == null ? 1 : (options.count || 1);
  //   var sentences = [];
  //   for (var i = 0; i < sentenceCount; i++) {
  //     var sentence = toInitialCase(this.ipsum_clause()+" "+this.ipsum_verb()+" "+this.ipsum_clause()+".")
  //     sentences.push(sentence);
  //   }
  //   return sentences.join(" ");
  // }


// var _menuItems = [
//   ["Male Name", this.maleName],
//   //["Female Name", this.femaleName],
//   //["Surname", this.surname]
//   // ["Male Full Name", this.maleFullName],
//   // ["Female Full Name", this.femaleFullName],
//   // null,
//   ["Color", this.color],
//   // ["Street Address",this.streetAddress],
//   // ["City",this.city],
//   // null,
//   // ["Ipsum 1 sentence",this.ipsum],
//   // ["Ipsum 3 sentences",this.ipsum,{count:3}],
//   // ["Ipsum 5 sentences",this.ipsum,{count:5}]
// ];
//

export default {
  color: _color,
  maleName: _maleName,

  menuItems: [
    ["Male Name", _maleName],
    ["Color", _color]
  ]
}
