'use strict';

(function () {

  var checkValidity = function (evt) {
    var amountRooms = pin.formMain.querySelector('#room_number');
    var amountPlaces = pin.formMain.querySelector('#capacity');
    var price = pin.formMain.querySelector('#price');
    var type = pin.formMain.querySelector('#type');
    var timein = pin.formMain.querySelector('#timein');
    var timeout = pin.formMain.querySelector('#timeout');
    var setPrice = function (number) {
      price.min = number;
      price.placeholder = number;
      price.setCustomValidity('');
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
        switch (type.value) {
          case 'bungalo' :
            setPrice(0);
            break;
          case 'flat' :
            setPrice(1000);
            break;
          case 'house' :
            setPrice(5000);
            break;
          case 'palace':
            setPrice(10000);
        }
        break;
      case 'timein' :
        timeout.value = timein.value;
        break;
      case 'timeout' :
        timein.value = timeout.value;
        break;
    }
  };

  pin.formMain.addEventListener('change', checkValidity);

  var title = pin.formMain.querySelector('#title');
  title.addEventListener('input', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Минимальное кол-во символов 30');
    } else {
      title.setCustomValidity('');
    }
  });
})();
