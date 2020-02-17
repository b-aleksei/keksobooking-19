'use strict';

(function () {

  // var arrayObjects = window.pin.response;
  var chouseHouse = document.querySelector('#housing-type');
  var typeHouse = chouseHouse.value;

  function updatePins(evt) {
    let type = evt.target.value;
    if (type !== 'any') {
      window.pin.response = window.pin.response.filter(function (item) {
        return item.offer.type === type;
      });
    }
    window.map.fillDom(window.pin.response);
  }

  chouseHouse.addEventListener('change', updatePins);

})();
