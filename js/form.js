'use strict';

(function () {

  var numberOfGuests = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var map = document.querySelector('.map');
  var main = document.body.querySelector('main');
  var formMain = document.forms[1];
  var reset = formMain.querySelector('.ad-form__reset');
  var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  var templateMessageError = document.querySelector('#error').content.querySelector('.error');
  var uploadSuccess = templateSuccessMessage.cloneNode(true);
  var uploadFail = templateMessageError.cloneNode(true);
  var timein = formMain.querySelector('#timein');
  var timeout = formMain.querySelector('#timeout');
  var type = formMain.querySelector('#type');
  var price = formMain.querySelector('#price');
  var amountRooms = formMain.querySelector('#room_number');
  var amountPlaces = formMain.querySelector('#capacity');
  var capacityOptions = amountPlaces.querySelectorAll('option');
  var previewPin = formMain.querySelector('.ad-form-header__preview img');
  var previewHouse = formMain.querySelector('.ad-form__photo');
  var preloader = document.createElement('img');

  var validateRooms = function () {
    var roomValue = amountRooms.value;
    capacityOptions.forEach(function (option) {
      option.selected = numberOfGuests[roomValue][0] === option.value;
      option.disabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
    });
  };

  validateRooms();

  amountRooms.addEventListener('change', validateRooms);

  type.addEventListener('change', function () {
    price.placeholder = price.min = window.card.types[type.value].min;
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // показ сообщений об успешной/неуспешной отправке
  var onHandlerMassage = function (node) {
    node.addEventListener('click', function () {
      node.remove();
    }, {once: true});
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        node.remove();
      }
    }, {once: true});
  };

  var resetForm = function () {
    formMain.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    window.pin.disableFilter();
    window.pin.activStatus = false;
    var pins = map.querySelectorAll('.map__pin[data-id]');
    pins.forEach(function (node) {
      node.remove();
    });
    document.forms[0].reset();
    var pinMain = map.querySelector('.map__pin--main');
    pinMain.style.cssText = 'left: 570px; top: 375px;';
    previewPin.src = 'img/muffin-grey.svg';
    previewHouse.innerHTML = '';
    price.placeholder = price.min = window.card.types[type.value].min;
    window.pin.getAddress();
    setTimeout(window.pin.getAddress, 0);
  };

  var sendSuccess = function () {
    document.body.append(uploadSuccess);
    onHandlerMassage(uploadSuccess);
    preloader.remove();
    resetForm();
  };

  var sendFail = function () {
    main.append(uploadFail);
    onHandlerMassage(uploadFail);
  };

  formMain.addEventListener('submit', function (evt) {
    evt.preventDefault();
    preloader = document.createElement('img');
    preloader.src = 'img/preloader.gif';
    preloader.style.cssText = 'position: fixed; top: 50%; left:50%; z-index:999;';
    document.body.append(preloader);
    window.request.upload(new FormData(formMain), sendSuccess, sendFail);
  });

  formMain.addEventListener('reset', resetForm);

})();
