'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var COMMENTS_COUNT = 5;
var COMMENTS_AVATARS_COUNT = 6;
var COMMENTS_MESSAGES_MOCK = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var COMMENTS_AUTHORS_MOCK = [
  'Артем',
  'Анна',
  'Сергей',
  'Валентина',
  'Пьер',
  'Надменный пижон',
  'Едкий пустослов',
  'Тролль обыкновенный',
  'Твой кошмар',
];

function generatePhotos(count) {
  var photos = [];

  for (var i = 1; i <= count; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'description',
      likes: getRandomNumberFromTo(MIN_LIKES, MAX_LIKES),
      comments: generateComments(COMMENTS_COUNT),
    });
  }

  return photos;
}

function generateComments(count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumberFromTo(1, COMMENTS_AVATARS_COUNT) + '.svg',
      message: getRandomFromMock(COMMENTS_MESSAGES_MOCK),
      name: getRandomFromMock(COMMENTS_AUTHORS_MOCK),
    });
  }

  return comments;
}

function getRandomNumberFromTo(start, end) {
  return Math.round(start + Math.random() * (end - start));
}

function getRandomFromMock(mock) {
  var lastIndex = mock.length - 1;
  return mock[Math.round(Math.random() * lastIndex)];
}

function createPhotoELementFromTemplate(photo) {
  var photoElement = document
    .querySelector('#picture')
    .content
    .querySelector('.picture')
    .cloneNode(true);

  photoElement.querySelector('.picture__img')
    .src = photo.url;

  photoElement.querySelector('.picture__likes')
    .textContent = photo.likes;

  photoElement.querySelector('.picture__comments')
    .textContent = photo.comments.length;

  return photoElement;
}

function renderPhotos(photos) {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    fragment.appendChild(createPhotoELementFromTemplate(photo));
  });

  pictures.appendChild(fragment);
}

renderPhotos(generatePhotos(PHOTOS_COUNT));

// Открытие/закрытие формы, установка фильтров. Надо будет разбить и отрефакторить
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var pageBody = document.querySelector('body');
  var editForm = document.querySelector('.img-upload__overlay');
  var closeBtn = editForm.querySelector('#upload-cancel');
  var effectsRadio = editForm.querySelectorAll('.effects__radio');
  var imgPreview = editForm.querySelector('.img-upload__preview');
  var effectSlider = editForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectSlider.querySelector('.effect-level__pin');

  var currentFilter;

  uploadFile.addEventListener('change', onFileUpload);

  closeBtn.addEventListener('click', onCloseButtonClick);

  function onFileUpload() {
    showEditForm();
  }

  function onCloseButtonClick() {
    closeEditForm();
  }

  function onEscPressed(evt) {
    var hashTagField = document.querySelector('.text__hashtags');
    var commentsField = document.querySelector('.text__description');

    if (
      (evt.key === 'Escape') &&
      (evt.target !== hashTagField) &&
      (evt.target !== commentsField)
    ) {
      closeEditForm();
      uploadFile.value = '';
    }
  }

  function showEditForm() {
    pageBody.classList.add('modal-open');
    editForm.classList.remove('hidden');
    document.addEventListener('keydown', onEscPressed);
  }

  function closeEditForm() {
    pageBody.classList.remove('modal-open');
    editForm.classList.add('hidden');
    document.removeEventListener('keydown', onEscPressed);
  }

  effectsRadio.forEach(function (element) {
    element.addEventListener('change', function (evt) {
      changeFilter('effects__preview--' + evt.target.value);
      setEffectIntensity(100);
      setVisibilitySlider(element.id);
    });
  });

  function changeFilter(filter) {
    if (currentFilter) {
      imgPreview.classList.remove(currentFilter);
    }

    if (filter) {
      imgPreview.classList.add(filter);
    }

    currentFilter = filter;
  }

  function setVisibilitySlider(effectName) {
    if (effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }

    if (effectName === 'effect-none') {
      effectSlider.classList.add('hidden');
    }
  }

  effectLevelPin.addEventListener('mouseup', function () {
    var elementLeft = effectLevelPin.offsetLeft;
    var parrentWidth = effectLevelPin.parentElement.offsetWidth;
    var proportion = Math.round(elementLeft / parrentWidth * 100);

    setEffectIntensity(proportion);
  });

  function setEffectIntensity(proportion) {
    function checkFilter(filter) {
      return imgPreview.classList.contains(filter);
    }

    function setFilterStyle(filterStyle) {
      imgPreview.style.filter = filterStyle;
    }

    switch (true) {
      case checkFilter('effects__preview--chrome'):
        setFilterStyle('grayscale(' + proportion / 100 + ')');
        break;

      case checkFilter('effects__preview--sepia'):
        setFilterStyle('sepia(' + proportion / 100 + ')');
        break;

      case checkFilter('effects__preview--marvin'):
        setFilterStyle('invert(' + proportion + '%)');
        break;

      case checkFilter('effects__preview--phobos'):
        setFilterStyle('blur(' + proportion / 100 * 3 + 'px)');
        break;

      case checkFilter('effects__preview--heat'):
        setFilterStyle('brightness(' + proportion / 100 * 3 + ')');
        break;

      default:
        setFilterStyle(null);
        break;
    }

  }

})();

// Настройка масштаба
(function () {
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_SHIFT = 25;
  var DEFAULT_SCALE_VALUE = 100;

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleSmallerButton = document.querySelector('.scale__control--smaller');
  var scaleBiggerButton = document.querySelector('.scale__control--bigger');
  var scaleValueField = document.querySelector('.scale__control--value');
  var currentScaleValue = DEFAULT_SCALE_VALUE;

  setScaleValue(DEFAULT_SCALE_VALUE);

  scaleSmallerButton.addEventListener('click', function () {
    if (currentScaleValue > MIN_SCALE_VALUE) {
      currentScaleValue -= SCALE_SHIFT;
      setScaleValue(currentScaleValue);
    }
  });

  scaleBiggerButton.addEventListener('click', function () {
    if (currentScaleValue < MAX_SCALE_VALUE) {
      currentScaleValue += SCALE_SHIFT;
      setScaleValue(currentScaleValue);
    }
  });

  function setScaleValue(scaleValue) {
    scaleValueField.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  }

})();

// Валидация хештегов и комментариев
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
