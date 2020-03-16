'use strict';

(function () {
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

  window.data = {
    photos: generatePhotos(PHOTOS_COUNT),
  };

})();
