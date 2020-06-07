'use strict';

(function () {

  var MAP_Y_START = 130;
  var MAP_Y_END = 630;
  var AMOUNT_PINS = 5;
  var ITEM_WIDTH = 25;
  var ITEM_HEIGHT = 70;
  var mapPins = document.querySelector('.map__pins');

  var makeItem = function (obj) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var item = template.cloneNode(true);
    var itemImg = item.querySelector('img');
    item.style.left = (obj.location.x - ITEM_WIDTH) + 'px';
    item.style.top = (obj.location.y - ITEM_HEIGHT) + 'px';
    itemImg.src = obj.author.avatar + '';
    itemImg.alt = obj.offer.title + '';
    return item;
  };

  var fillDom = function (arr) {
    var pins = mapPins.querySelectorAll('.map__pin[data-id]');
    pins.forEach(function (node) {
      node.remove();
    });
    if (arr.length > 0) {
      for (var i = 0; i < arr.length && i < AMOUNT_PINS; i++) {
        if (!arr[i].offer) {
          AMOUNT_PINS += 1;
          continue;
        }
        var item = makeItem(arr[i]);
        item.dataset.id = i;
        mapPins.appendChild(item);
      }
    }
  };

  window.map = {
    makeItem: makeItem,
    fillDom: fillDom,
    MAP_Y_START: MAP_Y_START,
    MAP_Y_END: MAP_Y_END,
  };

})();
