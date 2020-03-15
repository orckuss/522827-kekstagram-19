'use strict';

(function () {
  function getRandomNumberFromTo(start, end) {
    return Math.round(start + Math.random() * (end - start));
  }

  function getRandomFromMock(mock) {
    var lastIndex = mock.length - 1;
    return mock[Math.round(Math.random() * lastIndex)];
  }

  window.utils = {
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomFromMock: getRandomFromMock,
  };
})();
