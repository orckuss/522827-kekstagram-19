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

var createdPhotos = generatePhotos(PHOTOS_COUNT);
var bigPicture = document.querySelector('.big-picture');
var body = document.querySelector('body');

function generatePhotos(count) {
  var photos = [];

  for (var i = 1; i <= count; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'description',
      likes: window.utils.getRandomNumberFromTo(MIN_LIKES, MAX_LIKES),
      comments: generateComments(COMMENTS_COUNT),
    });
  }

  return photos;
}

function generateComments(count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: 'img/avatar-' + window.utils.getRandomNumberFromTo(1, COMMENTS_AVATARS_COUNT) + '.svg',
      message: window.utils.getRandomFromMock(COMMENTS_MESSAGES_MOCK),
      name: window.utils.getRandomFromMock(COMMENTS_AUTHORS_MOCK),
    });
  }

  return comments;
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

function renderPhotos() {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  createdPhotos.forEach(function (photo) {
    fragment.append(createPhotoELementFromTemplate(photo));
  });

  pictures.append(fragment);
}

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

renderPhotos();

function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.social__comment-count')
    .classList.add('hidden');
  bigPicture.querySelector('.comments-loader')
    .classList.add('hidden');

  body.classList.add('modal-open');

  renderBigPicture(photo);
}

function hideBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

function renderBigPicture(photo) {
  bigPicture.querySelector('.big-picture__img img')
    .src = photo.url;

  bigPicture.querySelector('.likes-count')
    .textContent = photo.likes;

  bigPicture.querySelector('.comments-count')
    .textContent = photo.comments.length;

  bigPicture.querySelector('.social__caption')
    .textContent = photo.description;

  renderComments(photo.comments);
}

function renderComments(comments) {
  var socialComments = document.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
    fragment.append(createNewComment(socialComment, comment));
  });

  socialComments.innerHTML = '';
  socialComments.append(fragment);
}

function createNewComment(comment, commentData) {
  var newComment = comment.cloneNode(true);
  var avatar = newComment.querySelector('.social__picture');
  var commentText = newComment.querySelector('.social__text');

  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  commentText.textContent = commentData.message;

  return newComment;
}

(function () {
  var pictures = document.querySelectorAll('.picture');
  var closeBtn = bigPicture.querySelector('.cancel');

  pictures.forEach(function (picture, index) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      showBigPicture(createdPhotos[index]);
      document.addEventListener('keydown', onEscPressed);
    });
  });

  closeBtn.addEventListener('click', onCloseBtnClick);

  function onCloseBtnClick() {
    hideBigPicture();
  }

  function onEscPressed(evt) {
    if (evt.key === 'Escape') {
      hideBigPicture();
      document.removeEventListener('keydown', onEscPressed);
    }
  }

})();
