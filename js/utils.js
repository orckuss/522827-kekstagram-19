'use strict';

(function () {
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

  window.utils = {
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomFromMock: getRandomFromMock,
    onEcsPressed: onEcsPressed,
  };
})();
