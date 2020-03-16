'use strict';

(function () {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var HASH_TAG_PATTERN = /(^|\s)(#[a-zа-яё\d]+)/i;
  var NOT_LITERAL_NUMERAL_PATTERN = /[^a-zа-яё\d]/i;

  var hashTagField = document.querySelector('.text__hashtags');

  hashTagField.addEventListener('change', function () {
    var hashTags = hashTagField.value.split(' ')
      .filter(function (hashTag) {
        return hashTag !== '';
      });

    hashTagField.value = hashTags.join(' ');
    hashTagField.setCustomValidity('');

    checkHashTagPattern(hashTags);
    checkAmountTags(hashTags, MAX_HASHTAGS_AMOUNT);
    checkTagLength(hashTags, MAX_HASHTAG_LENGTH);
    checkUniqueTag(hashTags);
  });

  function checkHashTagPattern(hashTags) {
    var wrongHashTag = hashTags.find(function (hashTag) {
      var match = HASH_TAG_PATTERN.test(hashTag);
      var mismatch = NOT_LITERAL_NUMERAL_PATTERN.test(hashTag.slice(1));

      return (!match || mismatch);
    });

    if (wrongHashTag) {
      hashTagField.setCustomValidity(wrongHashTag + ' is not allowed #HashTag');
    }
  }

  function checkAmountTags(hashTags, max) {
    if (hashTags.length > max) {
      hashTagField.setCustomValidity('Amount of tags is not allowed more then ' + max + ' tags');
    }
  }

  function checkTagLength(hashTags, max) {
    var tooLongTag = hashTags.find(function (hashTag) {
      return hashTag.length > max;
    });

    if (tooLongTag) {
      hashTagField.setCustomValidity(tooLongTag + ' is not allowed more then ' + max + ' symbols');
    }
  }

  function checkUniqueTag(hashTags) {
    hashTags = hashTags.map(function (hashTag) {
      return hashTag.toLowerCase();
    });

    var notUnique = hashTags.find(function (hashTag, index, currentArray) {
      return currentArray.includes(hashTag, index + 1);
    });

    if (notUnique) {
      hashTagField.setCustomValidity(notUnique + ' is not unique');
    }
  }

})();
