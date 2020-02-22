'use strict';

(function () {

  var form = document.forms[1];
  var photoPin = form.querySelector('#avatar');
  var previewPin = form.querySelector('.ad-form-header__preview img');
  var photoHouse = form.querySelector('#images');
  var previewHouse = form.querySelector('.ad-form__photo');

  var makeReader = function (fileList, img) {
    var filePin = fileList.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(filePin);
    reader.addEventListener('load', function () {
      img.src = reader.result;
    });
  };

  photoPin.addEventListener('change', function () {
    makeReader(photoPin, previewPin);
  });

  photoHouse.addEventListener('change', function () {
    var previewHouseImg = document.createElement('img');
    previewHouseImg.alt = 'Фотография жилья';
    previewHouseImg.style.cssText = 'width: 100%; height: auto';
    previewHouse.append(previewHouseImg);
    makeReader(photoHouse, previewHouseImg);
  });

})();
