'use strict';

(function () {

  var formMain = document.querySelector('.ad-form');
  var checkValidity = function (evt) {
    var amountRooms = formMain.querySelector('#room_number');
    var amountPlaces = formMain.querySelector('#capacity');
    var price = formMain.querySelector('#price');
    var type = formMain.querySelector('#type');
    var timein = formMain.querySelector('#timein');
    var timeout = formMain.querySelector('#timeout');
    var matchType = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
      setPrice: function (typeRoom) {
        price.min = this[typeRoom];
        price.placeholder = this[typeRoom];
        price.setCustomValidity('');
      }
    };
    var input = evt.target.id;
    switch (input) {
      case 'room_number' :
        amountPlaces.setCustomValidity('');
        if (amountRooms.value === '100' && amountPlaces.value !== '0') {
          amountRooms.setCustomValidity('Это количество комнат не для гостей');
        } else if (+amountRooms.value < +amountPlaces.value) {
          amountRooms.setCustomValidity('Количество комнат не может быть меньше количества гостей');
        } else {
          amountRooms.setCustomValidity('');
        }
        break;
      case 'capacity' :
        amountRooms.setCustomValidity('');
        if (amountPlaces.value === '0' && amountRooms.value !== '100') {
          amountPlaces.setCustomValidity('Пожалуйста выберите количество гостей');
        } else if (+amountRooms.value < +amountPlaces.value) {
          amountPlaces.setCustomValidity('Количество комнат не может быть меньше количества гостей');
        } else {
          amountPlaces.setCustomValidity('');
        }
        break;
      case 'price' :
        if (price.validity.rangeOverflow) {
          price.setCustomValidity('Максимальная цена 1000000');
        } else if (price.validity.rangeUnderflow) {
          price.setCustomValidity('Минимальная цена ' + price.min);
        } else {
          price.setCustomValidity('');
        }
        break;
      case 'type' :
        matchType.setPrice(type.value);
        break;
      case 'timein' :
        timeout.value = timein.value;
        break;
      case 'timeout' :
        timein.value = timeout.value;
        break;
    }
  };

  formMain.addEventListener('change', checkValidity);

  var title = formMain.querySelector('#title');
  title.addEventListener('input', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Минимальное кол-во символов 30');
    } else {
      title.setCustomValidity('');
    }
  });
})();
