'use strict';

(function () {
  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var closeBtn = editForm.querySelector('#upload-cancel');

  var hashTagField = document.querySelector('.text__hashtags');
  var commentsField = document.querySelector('.text__description');

  uploadFile.addEventListener('change', onFileUpload);
  closeBtn.addEventListener('click', onCloseButtonClick);

  function onFileUpload() {
    showEditForm();
  }

  function onCloseButtonClick() {
    closeEditForm();
  }

  function showEditForm() {
    body.classList.add('modal-open');
    editForm.classList.remove('hidden');
    document.addEventListener('keydown', onEscPressed);
  }

  function closeEditForm() {
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    document.removeEventListener('keydown', onEscPressed);
  }

  function onEscPressed(evt) {
    window.utils.onEcsPressed(evt, function () {
      closeEditForm();
      uploadFile.value = '';
    }, hashTagField);

    window.utils.onEcsPressed(evt, function () {
      closeEditForm();
      uploadFile.value = '';
    }, commentsField);
  }

})();
