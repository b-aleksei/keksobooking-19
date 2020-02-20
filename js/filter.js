'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var timeout = null;
  var formFilter = document.forms[0];
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var priceMatch = {
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: Number.MAX_VALUE},
  };

  function updatePins() {
    window.pin.arrayObjects = window.pin.response;
    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;
    var checkBoxes = formFilter.querySelectorAll('.map__checkbox:checked');
    checkBoxes = Array.from(checkBoxes);

    window.pin.arrayObjects = window.pin.arrayObjects.filter(function (item) {
      var validType = (typeValue === 'any') ? true : item.offer.type === typeValue;
      var validPrice = (priceValue === 'any') ? true : priceMatch[priceValue].min <= item.offer.price && item.offer.price < priceMatch[priceValue].max;
      var validRooms = (roomsValue === 'any') ? true : item.offer.rooms === Number(roomsValue);
      var validGuests = (guestsValue === 'any') ? true : item.offer.guests === Number(guestsValue);
      var checkboxValue = true;
      for (var i = 0; i < checkBoxes.length; i++) {
        checkboxValue = item.offer.features.some(function (it) {
          return it === checkBoxes[i].value;
        });
        if (!checkboxValue) {
          break;
        }
      }
      return validType && validPrice && validRooms && validGuests && checkboxValue;
    });

    window.map.fillDom(window.pin.arrayObjects);
  }

  formFilter.addEventListener('change', function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(updatePins, DEBOUNCE_INTERVAL);
  });

})();
