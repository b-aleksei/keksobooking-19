'use strict';

(function () {

  var mapFilters = document.querySelectorAll('.map__filter, fieldset');
  var mapPin = document.querySelector('.map__pin--main');
  var formMain = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var PIN_MAIN_X = 32;
  var PIN_MAIN_Y = 32;
  var PIN_HEIGHT = 70;

  var getAddress = function (pinHeight, pinWidth) {
    var x = pinWidth || PIN_MAIN_X;
    var y = pinHeight || PIN_MAIN_Y;
    address.value = (mapPin.offsetLeft - x) + ', ' + (mapPin.offsetTop - y);
  };
  getAddress();

  var disableFilter = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = !mapFilters[i].disabled;
    }
  };

  disableFilter();
  var activStatus = false;

  var startActivity = function () {
    window.map.fillDom();
    disableFilter();
    formMain.classList.remove('ad-form--disabled');
    window.data.map.classList.remove('map--faded');
    getAddress(PIN_HEIGHT);
    activStatus = true;
  };

  var startFromClick = function (evt) {
    if (evt.button === 0 && !activStatus) {
      startActivity();
    }
  };

  var startFromKeydown = function (evt) {
    if (evt.key === 'Enter' && !activStatus) {
      startActivity();
    }
  };

  mapPin.addEventListener('mousedown', startFromClick, {once: true});
  mapPin.addEventListener('keydown', startFromKeydown, {once: true});

  // показ карточек по клику на иконке
  var cardsClose = function (evt) {
    var ticket = window.data.map.querySelector('.popup');
    if (evt.key === 'Escape' && ticket) {
      ticket.remove();
      document.removeEventListener('keydown', cardsClose);
    }
  };

  window.data.map.addEventListener('click', function (evt) {
    document.addEventListener('keydown', cardsClose);
    var point = evt.target.closest('.map__pin');
    var ticket = window.data.map.querySelector('.popup');
    var cardClose = evt.target.matches('.popup__close');
    if (ticket) {
      ticket.remove();
    }
    if (point && !point.matches('.map__pin--main')) {
      var id = +point.dataset.id;
      window.card.createDomItemCard(window.map.arrObjects[id]);
    }
    if (cardClose) {
      ticket.remove();
    }
  });
})();
