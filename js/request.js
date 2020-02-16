'use strict';

(function () {

  var TIMEOUT_MS = 1000;
  var DELAY_ERROR_MS = 3000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var errorType = {
    200: 'OK',
    404: 'Cтраница не найдена, проверьте коректность адреса',
    500: 'Сервер временно не доступен, скоро все заработает',
    unknown: 'Неизвестная ошибка, попробуйте позднее',
  };

  var badRequest = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: fixed;' +
      ' left: 0; right: 0; font-size: 30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, DELAY_ERROR_MS);
  };

  var startRequest = function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200 :
          success(xhr.response);
          break;
        case 404 :
          error(xhr.status + ' ' + errorType[404]);
          break;
        case 500 :
          error(xhr.status + ' ' + errorType[500]);
          break;
        default :
          error(xhr.status + ' ' + errorType.unknown);
      }
    }, {once: true});

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения. Проверьте подключение к интернет');
    }, {once: true});

    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Обновите страницу.');
    }, {once: true});

    return xhr;
  };

  var load = function (success, error) {
    var xhr = startRequest(success, error);
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, success, error) {
    var xhr = startRequest(success, error);
    xhr.open('post', document.forms[1].action);
    xhr.send(data);
  };

  window.request = {
    load: load,
    upload: upload,
    badRequest: badRequest,
  };

})();
