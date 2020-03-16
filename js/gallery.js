'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  window.data.photos.forEach(function (photo) {
    fragment.append(createPhotoELementFromTemplate(photo));
  });

  picturesContainer.append(fragment);

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
