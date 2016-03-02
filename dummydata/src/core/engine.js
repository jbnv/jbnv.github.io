import Q from 'q'
import {shuffle} from "../util/random"
import {GlobalOrdinal} from "./ordinal"

import download from "../util/downloader"

function _processLine(line,options) {
  if (line.length == 0) return; // filter out blank lines
  var split = line.split("|");
  if (options != null && options.transform != null) {
    split = options.transform(split);
    if (split == null) {
      console.log(listName,"transform function produces null split!");
      return;
    }
  }
  return split;
}

function _listToData(listName,list,options) {
  console.log(listName+": Adding "+list.length+" lines.",options);
  result = [];
  list.forEach(function(line) {
    var split = _processLine(line,options);
    result.push(split);
  });
  shuffle(result);
  return result;
}

// group: 'Languages'|'Countries'
// subgroup: string
// sourceType: 'txt'|'json'|array
export function DummyDataEngine(group,subgroup,sourceType,options) {

  var _data = {},

      _group = group,
      _subgroup = subgroup,
      _sourceType = sourceType,
      _options = options,

      _repositoryURL = 'https://raw.githubusercontent.com/jbnv/WordLists/master/',
      _directory = _repositoryURL+_group+'/'+_subgroup+'/';

  function _engineOption(name) {
    if (!name) return null;
    if (options) return options[name];
    return null;
  }

  function _fileData(slug,content) {
    _data[slug] = content;
  }

  if (sourceType == 'txt') {

    var lineFn = function(line) {
      if (!line) return null;
      var a = line.split("|");
      var listName = a[0];
      var fileOptions = a.length > 1 && _engineOption(a[1]);

      return download(_directory+listName+'.txt')
      .then(
        function(text) {
          _listToData(listName,text.split("\n"),fileOptions);
          return listName+'.txt';
        },
        function(error) {
          console.error(error);
        }
      );
    };

    var downloadGroupList =
      download(_directory+subgroup+'.txt')
      .then(
        function(text) {
          return text.split("\n").map(lineFn);
        },
        function(error) {
          console.error(error);
        }
      );

    Q.allSettled(downloadGroupList)
    .then(
      function (results) {
        //console.log("Download results:",results);
      },
      function(error) {
        console.error(error);
      });

  } else if (sourceType == 'json') {

    // Download an entire language definition that was minified into a JSON file.
    download(_directory+subgroup+'.json')
    .then(
      function(json) {
        var data = JSON.parse(json);
        for (var listName in data) {
          _listToData(listName,data[listName],options);
        }
      },
      function(error) {
        console.error(error);
      }
    );

  } else {

    //TODO process array

  }

  // options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
  return function(listName,options) {
    //console.log("DummyDataEngine() BEGIN",listName,options);

    var list = _data[listName];
    if (list == null) {
      console.log("List '"+listName+"' is unavailable.")
      return "";
    }

    var ordinal = Math.floor(list.length*Math.random());//TEMP; needs to be GlobalOrdinal() % list.length;
    var itemArray = list[ordinal];
    if (itemArray == null) {
      console.log("Item "+ordinal+" of list '"+listName+"' is null.")
      return "";
    }
    if (itemArray.length == 0) {
      console.log("Item "+ordinal+" of list '"+listName+"' is an empty array.")
      return "";
    }

    if (options == null) return itemArray[0];

    var outbound = itemArray[0]; // catch-all

    if (options.partOfSpeech == 'noun') {
      outbound = itemArray[options.plural ? 1 : 0];
    }
    if (options.partOfSpeech == 'verb') {
      outbound = itemArray[0];
      switch (options.case) {
        case 'present-singular': outbound = itemArray[1] || itemArray[0]; break;
        case 'present-plural': outbound = itemArray[2] || itemArray[0]; break;
        case 'past': outbound = itemArray[3]; break;
        case 'participle': outbound = itemArray[4]; break;
      }
    }

    if (options.transform) {
      if (!options.transform.isArray) options.transform = [options.transform];
      options.transform.forEach(function(fn) {
        outbound = fn(outbound);
      });
    }
    return outbound;
  }

}
