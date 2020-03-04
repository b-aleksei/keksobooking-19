'use strict';

(function () {

  window.pin = {
    activStatus: false,
    response: [],
    arrayObjects: []
  };

  var TIME_OUT = window.request.TIMEOUT_MS;

  var ERROR_TYPE = {
    404: 'PAGE_NOT_FOUND',
    500: 'SERVER_ERROR',
    default: 'UNKNOWN ERROR',
    timeout: 'Запрос не успел выполниться за ' + TIME_OUT + 'мс. Попробуйте снова.',
    error: 'Произошла ошибка соединения. Проверьте подключение к интернет'
  };

  var PIN_MAIN_X = 32;
  var PIN_MAIN_Y = 32;
  var PIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var mapFilters = document.querySelectorAll('.map__filter, fieldset');
  var mapPin = document.querySelector('.map__pin--main');
  var formMain = document.querySelector('.ad-form');
  var address = document.querySelector('#address');

  var getAddress = function (pinHeight, pinWidth) {
    var x = pinWidth || PIN_MAIN_X;
    var y = pinHeight || PIN_MAIN_Y;
    address.value = (mapPin.offsetLeft + x) + ', ' + (mapPin.offsetTop + y);
  };
  getAddress();

  var disableFilter = function () {
    mapFilters.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  disableFilter();

  var startActivity = function () {
    window.request.start('get', window.request.URL_LOAD)
      .then(function (arr) {
        window.map.fillDom(arr);
        window.pin.response = arr;
        window.pin.arrayObjects = window.pin.response;
        disableFilter();
        formMain.classList.remove('ad-form--disabled');
        map.classList.remove('map--faded');
        getAddress(PIN_HEIGHT);
        window.pin.activStatus = true;
      })
      .catch(function (error) {
        var errorMessage = ERROR_TYPE[error] ? ERROR_TYPE[error] : ERROR_TYPE.default;
        window.request.handlerFailQuery(errorMessage);
      });
    // }, window.request.handlerFailQuery);
  };

  var onStartFromClick = function (evt) {
    if (evt.button === 0 && !window.pin.activStatus) {
      startActivity();
    }
  };

  var onStartFromKeydown = function (evt) {
    if (evt.key === 'Enter' && !window.pin.activStatus) {
      startActivity();
    }
  };

  mapPin.addEventListener('mousedown', onStartFromClick);
  mapPin.addEventListener('keydown', onStartFromKeydown);

  // закрытие карточек
  var onCloseCards = function (evt) {
    var ticket = map.querySelector('.popup');
    if (evt.key === 'Escape' && ticket) {
      ticket.remove();
      document.removeEventListener('keydown', onCloseCards);
    }
  };

  // показ карточек по клику на пине
  document.addEventListener('click', function (evt) {
    document.addEventListener('keydown', onCloseCards);
    var point = evt.target.closest('.map__pin[data-id]');
    var ticket = map.querySelector('.popup');
    var cardClose = evt.target.matches('.popup__close');
    if (!evt.target.closest('.map') && ticket) {
      ticket.remove();
    }
    if (point) {
      point.classList.add('.map__pin--active');
      if (ticket) {
        ticket.remove();
      }
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
        left = -PIN_MAIN_X;
      }
      if (left > map.offsetWidth - PIN_MAIN_X) {
        left = map.offsetWidth - PIN_MAIN_X;
      }
      if (top < window.map.MAP_Y_START - PIN_HEIGHT) {
        top = window.map.MAP_Y_START - PIN_HEIGHT;
      }
      if (top > window.map.MAP_Y_END - PIN_HEIGHT) {
        top = window.map.MAP_Y_END - PIN_HEIGHT;
      }

      mapPin.style.left = left + 'px';
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

