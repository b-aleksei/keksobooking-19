'use strict';

(function () {

  var numberOfGuests = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var formMain = document.querySelector('.ad-form');
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

  amountRooms.addEventListener('change', function () {
    validateRooms();
  });

  type.addEventListener('change', function () {
    price.min = window.card.types[type.value].min;
    price.placeholder = window.card.types[type.value].min;
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

})();
