'use strict';

(function () {
  var DEFAULT_VALUE = 100;

  var effectSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectSlider.querySelector('.effect-level__pin');
  var effectLevelDepth = effectSlider.querySelector('.effect-level__depth');
  var effectLevelField = effectSlider.querySelector('.effect-level__value');

  var elementLeft;
  var parrentWidth;
  var proportion;
  var startCoords = {
    x: 0,
    y: 0,
  };

  function setVisibility(effectName) {
    if (effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }

    if (effectName === 'effect-none') {
      effectSlider.classList.add('hidden');
    }
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
  });

  function onMouseMove(evt) {
    evt.preventDefault();

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.x - evt.clientY,
    };

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    elementLeft = effectLevelPin.offsetLeft - shift.x;
    proportion = Math.round(elementLeft / parrentWidth * 100);

    if (
      (elementLeft > 0) &&
      (elementLeft < parrentWidth)
    ) {
      effectLevelPin.style.left = elementLeft + 'px';
      effectLevelDepth.style.width = proportion + '%';
      effectLevelField.value = proportion;
      window.formFilter.setEffectIntensity(proportion);
    }
  }

  function onMouseUp(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function setDefault() {
    parrentWidth = effectLevelPin.parentElement.offsetWidth;
    effectLevelPin.style.left = parrentWidth + 'px';
    effectLevelDepth.style.width = DEFAULT_VALUE + '%';
    effectLevelField.value = DEFAULT_VALUE;
  }

  window.slider = {
    setVisibility: setVisibility,
    setDefault: setDefault,
  };

})();
