'use strict';

(function () {

  var SUCCES_REQUEST = 200;
  var TIMEOUT_MS = 1000;
  var DELAY_ERROR_MS = 3000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var handlerFailQuery = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: fixed;' +
      ' left: 0; right: 0; font-size: 30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, DELAY_ERROR_MS);
  };

  /* eslint-disable */
  var start = function (method, url, data) {

   return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT_MS;
      xhr.open(method, url);
      xhr.send(data);
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCES_REQUEST) {
          resolve(xhr.response);
        } else {
          reject(xhr.status)
        }
      }, {once: true});

      xhr.addEventListener('error', function () {
        reject('error');
      }, {once: true});

      xhr.addEventListener('timeout', function () {
        reject('timeout');
      }, {once: true});
    });
  };

  window.request = {
    start,
    handlerFailQuery,
    TIMEOUT_MS,
    URL_LOAD,
    URL_UPLOAD
  };

})();
