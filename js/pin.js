'use strict';

(function () {

  window.pin = {
    activStatus: false,
    response: [],
    arrayObjects: []
  };

  var map = document.querySelector('.map');
  var mapFilters = document.querySelectorAll('.map__filter, fieldset');
  var mapPin = document.querySelector('.map__pin--main');
  var formMain = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var PIN_MAIN_X = 32;
  var PIN_MAIN_Y = 32;
  var PIN_HEIGHT = 80;

  var getAddress = function (pinHeight, pinWidth) {
    var x = pinWidth || PIN_MAIN_X;
    var y = pinHeight || PIN_MAIN_Y;
    address.value = (mapPin.offsetLeft + x) + ', ' + (mapPin.offsetTop + y);
  };
  getAddress();

  var disableFilter = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = !mapFilters[i].disabled;
    }
  };

  disableFilter();

  var startActivity = function () {
    window.request.load(function (arr) {
      window.map.fillDom(arr);
      disableFilter();
      formMain.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      getAddress(PIN_HEIGHT);
      window.pin.activStatus = true;
      window.pin.response = arr;
      window.pin.arrayObjects = window.pin.response;
    }, window.request.badRequest);
  };

  var startFromClick = function (evt) {
    if (evt.button === 0 && !window.pin.activStatus) {
      startActivity();
    }
  };

  var startFromKeydown = function (evt) {
    if (evt.key === 'Enter' && !window.pin.activStatus) {
      startActivity();
    }
  };

  mapPin.addEventListener('mousedown', startFromClick);
  mapPin.addEventListener('keydown', startFromKeydown);

  // закрытие карточек
  var cardsClose = function (evt) {
    var ticket = map.querySelector('.popup');
    if (evt.key === 'Escape' && ticket) {
      ticket.remove();
      document.removeEventListener('keydown', cardsClose);
    }
  };

  // показ карточек по клику на пине
  map.addEventListener('click', function (evt) {
    document.addEventListener('keydown', cardsClose);
    var point = evt.target.closest('.map__pin[data-id]');
    var ticket = map.querySelector('.popup');
    var cardClose = evt.target.matches('.popup__close');
    if (ticket) {
      ticket.remove();
    }
    if (point) {
      point.classList.add('.map__pin--active');
      point.addEventListener('focusout', function () {
        point.classList.remove('.map__pin--active');
      }, {once: true});
      var id = +point.dataset.id;
      window.card.createDomItem(window.pin.arrayObjects[id]);
    }
    if (cardClose) {
      ticket.remove();
    }
  });

  //  перемещение метки
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var shift = {
      x: evt.clientX - mapPin.offsetLeft,
      y: evt.clientY - mapPin.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
      var left = e.clientX - shift.x;
      var top = e.clientY - shift.y;

      if (left < 0 - PIN_MAIN_X) {
        left = 0 - PIN_MAIN_X;
      }

      if (left > map.offsetWidth - PIN_MAIN_X) {
        left = map.offsetWidth - PIN_MAIN_X;
      }
      mapPin.style.left = left + 'px';

      if (top < window.map.MAP_Y_START - PIN_HEIGHT) {
        top = window.map.MAP_Y_START - PIN_HEIGHT;
      }

      if (top > window.map.MAP_Y_END - PIN_HEIGHT) {
        top = window.map.MAP_Y_END - PIN_HEIGHT;
      }
      mapPin.style.top = top + 'px';

      getAddress(PIN_HEIGHT);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });
  window.pin.disableFilter = disableFilter;
  window.pin.getAddress = getAddress;

})();

