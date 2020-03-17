'use strict';

(function () {
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectSlider.querySelector('.effect-level__pin');

  function setVisibility(effectName) {
    if (effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }

    if (effectName === 'effect-none') {
      effectSlider.classList.add('hidden');
    }
  }

  effectLevelPin.addEventListener('mouseup', function () {
    var elementLeft = effectLevelPin.offsetLeft;
    var parrentWidth = effectLevelPin.parentElement.offsetWidth;
    var proportion = Math.round(elementLeft / parrentWidth * 100);

    window.formFilter.setEffectIntensity(proportion);
  });

  window.slider = {
    setVisibility: setVisibility,
  };

})();
