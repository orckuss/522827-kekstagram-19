'use strict';

(function () {
  var MAX_INTENSITY = 100;
  var DEFAULT_INTENSITY = 100;

  var editForm = document.querySelector('.img-upload__overlay');
  var effectsRadio = editForm.querySelectorAll('.effects__radio');
  var imgPreview = editForm.querySelector('.img-upload__preview');

  var currentFilter;

  effectsRadio.forEach(function (element) {
    element.addEventListener('change', function (evt) {
      changeFilter('effects__preview--' + evt.target.value);
      setEffectIntensity(DEFAULT_INTENSITY);
      window.slider.setVisibility(element.id);
      window.slider.setDefault();
    });
  });

  function setDefault() {
    effectsRadio[0].checked = true;
    changeFilter('effects__preview--' + effectsRadio[0].value);
    setEffectIntensity(DEFAULT_INTENSITY);
    window.slider.setVisibility(effectsRadio[0].id);
    window.slider.setDefault();
  }

  function changeFilter(filter) {
    if (currentFilter) {
      imgPreview.classList.remove(currentFilter);
    }

    if (filter) {
      imgPreview.classList.add(filter);
    }

    currentFilter = filter;
  }

  function setEffectIntensity(proportion) {
    function checkFilter(filter) {
      return imgPreview.classList.contains(filter);
    }

    function setFilterStyle(filterStyle) {
      imgPreview.style.filter = filterStyle;
    }

    switch (true) {
      case checkFilter('effects__preview--chrome'):
        setFilterStyle('grayscale(' + proportion / MAX_INTENSITY + ')');
        break;

      case checkFilter('effects__preview--sepia'):
        setFilterStyle('sepia(' + proportion / MAX_INTENSITY + ')');
        break;

      case checkFilter('effects__preview--marvin'):
        setFilterStyle('invert(' + proportion + '%)');
        break;

      case checkFilter('effects__preview--phobos'):
        setFilterStyle('blur(' + proportion / MAX_INTENSITY * 3 + 'px)');
        break;

      case checkFilter('effects__preview--heat'):
        setFilterStyle('brightness(' + proportion / MAX_INTENSITY * 3 + ')');
        break;

      default:
        setFilterStyle(null);
        break;
    }

  }

  window.formFilter = {
    setEffectIntensity: setEffectIntensity,
    setDefault: setDefault,
  };

})();
