'use strict';

(function () {
  var closeBtn = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');

  closeBtn.addEventListener('click', function () {
    hide();
  });

  function show(photo) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    render(photo);
    window.pictureComments.init(photo.comments);
    document.addEventListener('keydown', onEscPressed);
  }

  function hide() {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPressed);
    window.pictureComments.destroy();
  }

  function onEscPressed(evt) {
    window.utils.onEcsPressed(evt, hide);
  }

  function render(photo) {
    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureDescription.textContent = photo.description;
  }

  window.pictureDialog = {
    show: show,
    hide: hide,
  };

})();
