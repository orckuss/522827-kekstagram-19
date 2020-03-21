'use strict';

(function () {
  var RANDOM_COUNT = 10;

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button');
  var imgFilterDefault = imgFilters.querySelector('#filter-default');
  var imgFilterRandom = imgFilters.querySelector('#filter-random');
  var imgFilterDiscussed = imgFilters.querySelector('#filter-discussed');

  var photos;
  var pictures;

  window.http.get(onSuccess);

  function onSuccess(response) {
    photos = response;
    window.render(photos);
    setPictures(photos);
    imgFilters.classList.remove('img-filters--inactive');
  }

  imgFilterDefault.addEventListener('click', function () {
    setActive(imgFilterDefault);
    updatePhotos(photos);
    setPictures(photos);
  });

  imgFilterRandom.addEventListener('click', function () {
    setActive(imgFilterRandom);
    var randomPhotos = getRandomPhotos();
    updatePhotos(randomPhotos);
    setPictures(randomPhotos);
  });

  imgFilterDiscussed.addEventListener('click', function () {
    setActive(imgFilterDiscussed);
    var discussedPhotos = getDiscussedPhotos();
    updatePhotos(discussedPhotos);
    setPictures(discussedPhotos);
  });

  function setPictures(data) {
    pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture, index) {
      picture.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.pictureDialog.show(data[index]);
      });
    });
  }

  function setActive(element) {
    imgFiltersButtons.forEach((function (value) {
      value.classList.remove('img-filters__button--active');
    }));
    element.classList.add('img-filters__button--active');
  }

  function updatePhotos(data) {
    pictures.forEach(function (picture) {
      picture.remove();
    });
    window.render(data);
  }

  function getRandomPhotos() {
    var randomPhotos = [];
    while (randomPhotos.length < RANDOM_COUNT) {
      var randomIndex = window.utils.getRandomNumberFromTo(0, photos.length - 1);
      if (!randomPhotos.includes(photos[randomIndex])) {
        randomPhotos.push(photos[randomIndex]);
      }
    }
    return randomPhotos;
  }

  function getDiscussedPhotos() {
    return photos.slice().sort(function (previosPhoto, nextPhoto) {
      return nextPhoto.comments.length - previosPhoto.comments.length;
    });
  }

})();
