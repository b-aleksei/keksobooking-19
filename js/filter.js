'use strict';

(function () {

  var typeHouse = document.querySelector('#housing-type');

  function updatePins(evt) {
    var type = evt.target.value;
    window.pin.arrayObjects = window.pin.response;
    if (type !== 'any') {
      window.pin.arrayObjects = window.pin.arrayObjects.filter(function (item) {
        return item.offer.type === type;
      });
    }
    window.map.fillDom(window.pin.arrayObjects);
  }
  typeHouse.addEventListener('change', updatePins);

})();
