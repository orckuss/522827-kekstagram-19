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
  var FILTER_MAP = {
    'effect-none': '',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat',
  };

  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var closeBtn = editForm.querySelector('#upload-cancel');
  var effectsRadio = editForm.querySelectorAll('.effects__radio');
  var imgUploadPreview = editForm.querySelector('.img-upload__preview');
  var effectLevelPin = editForm.querySelector('.effect-level__pin');

  var currentFilter = FILTER_MAP['effect-none'];

  uploadFile.addEventListener('change', function () {
    showEditForm();
  });

  closeBtn.addEventListener('click', function () {
    closeEditForm();
  });

  function showEditForm() {
    document.querySelector('body')
      .classList.add('modal-open');
    editForm.classList.remove('hidden');

    setDefaultEditFormState();

    document.addEventListener('keydown', onEscPressed);
  }

  function closeEditForm() {
    document.querySelector('body')
      .classList.remove('modal-open');
    editForm.classList.add('hidden');

    document.removeEventListener('keydown', onEscPressed);
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

  function setDefaultEditFormState() {
    effectsRadio[0].checked = true;
    changeFilter(FILTER_MAP['effect-none']);
    hideEffectLevelSlider();
  }

  effectsRadio.forEach(function (element) {
    element.addEventListener('change', function () {
      changeFilter(FILTER_MAP[element.id]);
      setEffectIntensity(100);

      showEffectLevelSlider();

      if (element.id === 'effect-none') {
        hideEffectLevelSlider();
      }
    });
  });

  function changeFilter(filter) {
    if (currentFilter) {
      imgUploadPreview.classList
        .remove(currentFilter);
    }

    if (filter) {

      imgUploadPreview.classList
        .add(filter);
    }

    currentFilter = filter;
  }

  function hideEffectLevelSlider() {
    editForm.querySelector('.img-upload__effect-level')
      .classList.add('hidden');
  }

  function showEffectLevelSlider() {
    editForm.querySelector('.img-upload__effect-level')
      .classList.remove('hidden');
  }

  effectLevelPin.addEventListener('mouseup', function () {
    var elementLeft = effectLevelPin.offsetLeft;
    var parrentWidth = effectLevelPin.parentElement.offsetWidth;
    var proportion = Math.round(elementLeft / parrentWidth * 100);

    setEffectIntensity(proportion);
  });

  function setEffectIntensity(proportion) {
    imgUploadPreview.style.filter = null;

    if (imgUploadPreview.classList.contains(FILTER_MAP['effect-chrome'])) {
      changeGrayscale(imgUploadPreview, proportion);
    }

    if (imgUploadPreview.classList.contains(FILTER_MAP['effect-sepia'])) {
      changeSepia(imgUploadPreview, proportion);
    }

    if (imgUploadPreview.classList.contains(FILTER_MAP['effect-marvin'])) {
      changeInvert(imgUploadPreview, proportion);
    }

    if (imgUploadPreview.classList.contains(FILTER_MAP['effect-phobos'])) {
      changeBlur(imgUploadPreview, proportion);
    }

    if (imgUploadPreview.classList.contains(FILTER_MAP['effect-heat'])) {
      changeBrightness(imgUploadPreview, proportion);
    }
  }

  function changeGrayscale(element, value) {
    element.style.filter = 'grayscale(' + value / 100 + ')';
  }

  function changeSepia(element, value) {
    element.style.filter = 'sepia(' + value / 100 + ')';
  }

  function changeInvert(element, value) {
    element.style.filter = 'invert(' + value + '%)';
  }

  function changeBlur(element, value) {
    element.style.filter = 'blur(' + value / 100 * 3 + 'px)';
  }

  function changeBrightness(element, value) {
    element.style.filter = 'brightness(' + value / 100 * 3 + ')';
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
