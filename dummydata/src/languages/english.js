import { DummyDataEngine } from "../core/engine"
import { Selector } from "../core/selector"
import djoin from "../util/djoin"
import { singularOrPlural } from "../util/grammar"
import "../util/extensions"

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
var _data = function() {};
let _enginePromise = new DummyDataEngine('Languages','English','txt',listOptions);
_enginePromise.then(data => _data = data).done();

function _color() {
    var baseColor = _data('EnglishColors');
    if (baseColor == null) return null;
    if (baseColor == "black" || baseColor == "white") { return baseColor; }
    var modifiers = ["light","medium","dark","bright","pale"];
    var selector = Math.random();
    if (selector < 0.3) { return modifiers[Math.floor(selector/0.3*modifiers.length)]+" "+baseColor; }
    return baseColor;
}

function _substance() { return _data('EnglishSubstances') || ""; }

let _maleName = new Selector([
  [2,() => _data('EnglishMaleNames')],
  [2,() => _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes1')],
  [2,() => _data('EnglishNamePrefixes1')+_data('EnglishNameSuffixes2')],
  () => _data('EnglishNamePrefixes2')+_data('EnglishNameSuffixes1')
])

function _femaleName() {
  var selector = Math.random();
  if (selector < 0.8) return _data('EnglishFemaleNames');
  return _maleName()+_data('EnglishFeminineSuffixes');
}

function _surnameNamePrefix() { return _data('EnglishSurnameNamePrefixes') || ""; }
function _nameSuffix1() { return _data('EnglishNameSuffixes1') || ""; }

let _surname = new Selector([
  [10,() => _data('EnglishSurnames')],
  [4,_maleName],
  [5,() => djoin(_maleName,_nameSuffix1)],
  [3,() => djoin(_substance,_nameSuffix1).toInitialCase()],
  [5,() => djoin(_surnameNamePrefix,() => _data('EnglishSurnames'))],
  [10,() => djoin(_surnameNamePrefix,_maleName)],
  [1,() => djoin(_surnameNamePrefix,_maleName,_nameSuffix1)],
  [1,() => djoin(_surnameNamePrefix,_substance,_nameSuffix1).toInitialCase()]
]);

function _maleFullName() { return djoin(_maleName,' ',_surname); };

function _femaleFullName() { return djoin(_femaleName,' ',_surname); };

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
  //   function() { return [_maleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [_femaleName()+"'s",singularOrPlural(0.50)]; },
  //   function() { return [_surname()+"'s",singularOrPlural(0.50)]; }
  // ]);

let _cardinalDirectionsForAddresses = new Selector([
  [10,['']],
  [4,['N.','S.','E.','W.']],
  [1,['NW','NE','SW','SE']]
]);

let _streetName = new Selector([
  function() { return _data('EnglishAnimals'); },
  function() { return _color(); },
  function() { return _data('EnglishOrdinalNumbers'); },
  function() { return _data('EnglishPlants'); },
  function() { return _maleName(); },
  function() { return _femaleName(); },
  function() { return _surname(); },
  function() { return _maleFullName(); },
  function() { return _femaleFullName(); },
  function() { return _data('EnglishAdjectives')+' '+_data('EnglishTerrainWords'); },
  function() { return _data('EnglishTerrainWords')+['side','view'].randomElement(); }
]);

function _streetAddress() {
  var number = Math.floor(Math.pow(100000,Math.random()));
  var cardinalDirection = _cardinalDirectionsForAddresses();
  var streetType = _data('EnglishRoadTypes');
  var address
    = "" + number + " "
    + cardinalDirection + (cardinalDirection == '' ? '' : " ")
    + _streetName() + " " + streetType;
  return address.toTitleCase();
}

let _cardinalDirectionsForCity = new Selector([
  [10,['']],
  [4,['North','South','East','West']],
  [1,['Upper','Lower']]
]);

let _cityModifiers = ['town','ton','ville','burg',' City',' Springs',' Heights',' Town'];

let _citySelector = new Selector([
  function() { return _surname(); },
  function() { return _surname()+_cityModifiers.randomElement(); },
  function() { return _surname()+_cityModifiers.randomElement(); },
  function() { return _maleName()+_cityModifiers.randomElement(); },
  function() { return _femaleName()+_cityModifiers.randomElement(); },
  function() { return "Lake "+_surname(); },
  function() { return "Lake "+_maleName(); },
  function() { return "Lake "+_femaleName(); },
  function() { return "Mount "+_surname(); },
  function() { return "Mount "+_maleName(); },
  function() { return "Mount "+_femaleName(); }
]);

function _city() {
  var cardinalDirection = _cardinalDirectionsForCity();
  var city
    = cardinalDirection + (cardinalDirection == '' ? '' : " ")
    + _citySelector();
  return city.toTitleCase();
}

  // ipsum_noun_selector = new Selector([
  //   function() { return _data('EnglishAnimals'); }, //TEMP _dataOptions removed from each
  //   function() { return _data('EnglishPlants'); },
  //   function() { return _data('EnglishRoadTypes'); },
  //   function() { return _data('EnglishSubstances'); }
  // ]);
  //
  // ipsum_clause() {
  //   var adjectivePhraseArray = _adjectivePhrase();
  //   var _dataOptions = {
  //     partOfSpeech: 'noun',
  //     plural: adjectivePhraseArray.length >= 2 && adjectivePhraseArray[1]
  //   };
  //   return adjectivePhraseArray[0]+" "+_ipsum_noun_selector();
  // }
  //
  // verbSelector(tense) {
  //   return _data('EnglishVerbs',{partOfSpeech:'verb','case':tense});
  // }
  //
  // ipsum_verb = new Selector([
  //   [5, function() { return _verbSelector('past');}],
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
  //       + _verbSelector(selector1[1]);
  //     return outbound;
  //   }]
  // ]);
  //
  // ipsum(options) {
  //   var sentenceCount = options == null ? 1 : (options.count || 1);
  //   var sentences = [];
  //   for (var i = 0; i < sentenceCount; i++) {
  //     var sentence = toInitialCase(_ipsum_clause()+" "+_ipsum_verb()+" "+_ipsum_clause()+".")
  //     sentences.push(sentence);
  //   }
  //   return sentences.join(" ");
  // }

export default {
  color: _color,
  femaleName: _femaleName,
  maleName: _maleName,
  surname: _surname,
  maleFullName: _maleFullName,
  femaleFullName: _femaleFullName,
  streetAddress: _streetAddress,
  city: _city,

  menuItems: [
    ["Male Name", _maleName],
    ["Female Name", _femaleName],
    ["Surname", _surname],
    ["Male Full Name", _maleFullName],
    ["Female Full Name", _femaleFullName],
    null,
    ["Color", _color],
    ["Street Address",_streetAddress],
    ["City",_city],
    // null,
    // ["Ipsum 1 sentence",_ipsum],
    // ["Ipsum 3 sentences",_ipsum,{count:3}],
    // ["Ipsum 5 sentences",_ipsum,{count:5}]
  ]
}
