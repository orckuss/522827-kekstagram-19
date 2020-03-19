'use strict';

(function () {
  var main = document.querySelector('main');
  var successElement = document.querySelector('#success')
    .content.querySelector('.success');
  var successCloseButton = successElement
    .querySelector('.success__button');

  var errorElement = document.querySelector('#error')
    .content.querySelector('.error');
  var errorCloseButton = errorElement
    .querySelector('.error__button');

  successElement.addEventListener('click', function (evt) {
    if (evt.target === successElement) {
      hideSuccess();
    }
  });

  successCloseButton.addEventListener('click', function () {
    hideSuccess();
  });

  errorElement.addEventListener('click', function (evt) {
    if (evt.target === errorElement) {
      hideError();
    }
  });

  errorCloseButton.addEventListener('click', function () {
    hideError();
  });

  function showSuccess() {
    main.append(successElement);
    document.addEventListener('keydown', onEcsPressed);
  }

  function showError() {
    main.append(errorElement);
    document.addEventListener('keydown', onEcsPressedErr);
  }

  function hideSuccess() {
    successElement.remove();
    document.removeEventListener('keydown', onEcsPressed);
  }

  function hideError() {
    errorElement.remove();
    document.removeEventListener('keydown', onEcsPressedErr);
  }

  function onEcsPressed(evt) {
    window.utils.onEcsPressed(evt, hideSuccess);
  }

  function onEcsPressedErr(evt) {
    window.utils.onEcsPressed(evt, hideError);
  }

  window.notification = {
    showSuccess: showSuccess,
    showError: showError,
  };

})();
