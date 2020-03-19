'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  function get(onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError, {
      type: 'json',
    });

    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  function post(data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError, {
      type: 'multipart/form-data',
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function createRequest(onSuccess, onError, options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = options.type;

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
    post: post,
  };

})();
