'use strict';

(function () {

  var numberOfGuests = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var main = document.body.querySelector('main');
  var formMain = document.forms[1];
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
  var onRemoveNode = function (node) {
    node.remove();
    // eslint-disable-next-line no-invalid-this
    this.removeEventListener('click', onRemoveNode);
  };

  var sendSuccess = function () {
    document.body.append(uploadSuccess);
    uploadSuccess.addEventListener('click', onRemoveNode.bind(uploadSuccess, uploadSuccess));
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        uploadSuccess.remove();
      }
    }, {once: true});
  };

  var sendFail = function () {
    main.append(uploadFail);
    var errorButton = uploadFail.querySelector('.error__button');
    uploadFail.addEventListener('click', onRemoveNode.bind(uploadFail, uploadFail));
    errorButton.addEventListener('click', onRemoveNode.bind(errorButton, uploadFail));
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        uploadFail.remove();
      }
    }, {once: true});
  };

  formMain.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.request.upload(new FormData(formMain), sendSuccess, sendFail);
  });


  /*  var but = document.querySelector('.ad-form__submit');
    but.addEventListener('click', function (evt) {
      evt.preventDefault();
      sendFail();
    });*/
})();
