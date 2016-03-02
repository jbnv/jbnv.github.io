import Q from 'q'

// return: promise
export default function(url) {
  //console.log("Downloading file.",url);

  var request = new XMLHttpRequest();
  var deferred = Q.defer();

  request.open("GET", url, true);
  request.onload = onload;
  request.onerror = onerror;
  request.onprogress = onprogress;
  request.send();

  function onload() {
    if (request.status !== 200) {
      deferred.reject(new Error("Status code was " + request.status));
      return;
    }

    if (request.responseText == "") {
      deferred.reject(new Error("No data returned!"));
      return;
    }

    //console.log("File downloaded.",url);
    deferred.resolve(request.responseText);
  }

  function onerror() {
    deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
  }

  function onprogress(event) {
    deferred.notify(event.loaded / event.total);
  }

  return deferred.promise;
}
