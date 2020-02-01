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
