'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__form');
  var editFormView = editForm.querySelector('.img-upload__overlay');
  var closeBtn = editFormView.querySelector('#upload-cancel');
  var imgPreview = editForm.querySelector('.img-upload__preview img');

  var hashTagField = document.querySelector('.text__hashtags');
  var commentsField = document.querySelector('.text__description');

  uploadFile.addEventListener('change', onFileUpload);
  closeBtn.addEventListener('click', onCloseButtonClick);

  editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.http.post(new FormData(editForm), onSuccess, onError);
  });

  function onSuccess() {
    closeEditForm();
    window.notification.show('success');
  }

  function onError() {
    closeEditForm();
    window.notification.show('error');
  }

  function onFileUpload() {
    showEditForm();
    loadFile();
  }

  function onCloseButtonClick() {
    closeEditForm();
  }

  function showEditForm() {
    body.classList.add('modal-open');
    editFormView.classList.remove('hidden');
    window.formFilter.setDefault();
    window.scale.setDefault();
    document.addEventListener('keydown', onEscPressed);
  }

  function closeEditForm() {
    uploadFile.value = '';
    hashTagField.value = '';
    commentsField.value = '';
    body.classList.remove('modal-open');
    editFormView.classList.add('hidden');
    document.removeEventListener('keydown', onEscPressed);
  }

  function onEscPressed(evt) {
    window.utils.onEcsPressed(evt, closeEditForm, hashTagField, commentsField);
  }

  function loadFile() {
    var fileName = uploadFile.files[0].name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;
      });
      reader.readAsDataURL(uploadFile.files[0]);
    }
  }

})();
