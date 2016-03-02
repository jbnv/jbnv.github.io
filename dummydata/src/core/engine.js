import Q from 'q'
import {shuffle} from "../util/random"
import {GlobalOrdinal} from "./ordinal"

import download from "../util/downloader"

var _repositoryURL = 'https://raw.githubusercontent.com/jbnv/WordLists/master/';

function _repository(group,subgroup) {
  return _repositoryURL+group+'/'+subgroup+'/';
}

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
  let result = list.map(line => _processLine(line,options));
  shuffle(result);
  return result;
}

// Returns a promise.
function _downloadText(group,subgroup,options) {

  function option(name) {
    if (!name) return null;
    if (options) return options[name];
    return null;
  }

  let _dir = _repository(group,subgroup);

  var lineFn = function(line) {
    if (!line) return null;
    var a = line.split("|");
    var listName = a[0];
    var fileOptions = a.length > 1 && option(a[1]);

    return download(_dir+listName+'.txt')
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
    download(_dir+subgroup+'.txt')
    .then(
      function(text) {
        return text.split("\n").map(lineFn);
      },
      function(error) {
        console.error(error);
      }
    );

  return Q.allSettled(downloadGroupList);
}

// Download an entire language definition that was minified into a JSON file.
// Returns a promise.
function _downloadJson(group,subgroup,options) {

  let outbound =
    download(_repository(group,subgroup)+subgroup+'.json')
    .then(
      function(json) {
        var data = JSON.parse(json);
        for (var listName in data) {
          return _listToData(listName,data[listName],options);
        }
      },
      function(error) {
        console.error(error);
      }
    );

  return outbound;
}

// group: 'Languages'|'Countries'
// subgroup: string
// sourceType: 'txt'|'json'|array
export function DummyDataEngine(group,subgroup,sourceType,options) {

  var _data = null;

  // download: a promise that returns data for the _data object.
  let download = function() {
    return { then: function() {} };
  }

  if (sourceType == 'txt') {
    download = _downloadText;
  } else if (sourceType == 'json') {
    download = _downloadJson;
  }

  // options.transform: function(t) that produces an array based on t per the part-of-speech pattern.
  return function(listName,options) {

    if (!_data) {
      download(group,subgroup,options).then(data => _data = data).done();
      console.log("engine:",_data);
    }

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
