'use strict';

(function () {
  var main = document.querySelector('main');

  var element;
  var closeButton;

  function show(type) {
    init(type);
    main.append(element);
    document.addEventListener('keydown', onEcsPressed);
  }

  function init(type) {
    element = document.querySelector('#' + type)
      .content.querySelector('.' + type)
      .cloneNode(true);
    closeButton = element
      .querySelector('.' + type + '__button');

    element.addEventListener('click', function (evt) {
      if (evt.target === element) {
        hide();
      }
    });

    closeButton.addEventListener('click', function () {
      hide();
    });
  }

  function hide() {
    element.remove();
    document.removeEventListener('keydown', onEcsPressed);
  }

  function onEcsPressed(evt) {
    window.utils.onEcsPressed(evt, hide);
  }

  window.notification = {
    show: show,
  };

})();
