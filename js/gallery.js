'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  window.http.get(onSuccess);

  function onSuccess(response) {
    renderPhotos(response);

    document.querySelectorAll('.picture')
      .forEach(function (picture, index) {
        picture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.pictureDialog.show(response[index]);
        });
      });
  }

  function renderPhotos(photos) {
    photos.forEach(function (photo) {
      fragment.append(createPhotoELementFromTemplate(photo));
    });

    picturesContainer.append(fragment);
  }

  function createPhotoELementFromTemplate(photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img')
      .src = photo.url;

    photoElement.querySelector('.picture__likes')
      .textContent = photo.likes;

    photoElement.querySelector('.picture__comments')
      .textContent = photo.comments.length;

    return photoElement;
  }

})();
