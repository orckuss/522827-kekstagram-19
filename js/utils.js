'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function getRandomNumberFromTo(start, end) {
    return Math.round(start + Math.random() * (end - start));
  }

  function getRandomFromMock(mock) {
    var lastIndex = mock.length - 1;
    return mock[Math.round(Math.random() * lastIndex)];
  }

  function onEcsPressed(evt, action) {
    if (
      (evt.key === 'Escape') &&
      (checkArguments(arguments, evt.target))
    ) {
      action();
    }
  }

  function checkArguments(args, value) {
    return Array.prototype.every.call(args, function (item) {
      return item !== value;
    });
  }

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomFromMock: getRandomFromMock,
    onEcsPressed: onEcsPressed,
    debounce: debounce,
  };
})();
