'use strict';

(function () {
  window.http.get(onSuccess);

  function onSuccess(response) {
    window.render(response);

    document.querySelectorAll('.picture')
      .forEach(function (picture, index) {
        picture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.pictureDialog.show(response[index]);
        });
      });
  }

})();
