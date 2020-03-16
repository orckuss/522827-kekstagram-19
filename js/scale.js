'use strict';

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

  function setDefault() {
    setScale(DEFAULT_SCALE_VALUE);
  }

  scaleSmallerButton.addEventListener('click', function () {
    if (currentScaleValue > MIN_SCALE_VALUE) {
      currentScaleValue -= SCALE_SHIFT;
      setScale(currentScaleValue);
    }
  });

  scaleBiggerButton.addEventListener('click', function () {
    if (currentScaleValue < MAX_SCALE_VALUE) {
      currentScaleValue += SCALE_SHIFT;
      setScale(currentScaleValue);
    }
  });

  function setScale(scaleValue) {
    scaleValueField.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  }

  window.scale = {
    setDefault: setDefault,
  };

})();
