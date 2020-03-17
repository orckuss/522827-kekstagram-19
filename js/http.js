'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  function get(onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);

    xhr.open('GET', URL);
    xhr.send();
  }

  function createRequest(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status + xhr.statusText);
      }
    });

    return xhr;
  }

  window.http = {
    get: get,
  };

})();
