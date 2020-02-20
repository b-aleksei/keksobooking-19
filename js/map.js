'use strict';

(function () {
  var map = document.querySelector('.map');
  var MAP_Y_START = 130;
  var MAP_Y_END = 630;
  var mapPins = document.querySelector('.map__pins');
  var AMOUNT_PINS = 5;

  var random = function (max, min) {
    var minValue = min ? min : 0;
    return minValue + Math.floor(Math.random() * (max + 1 - minValue));
  };

  var makeItem = function (obj) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var item = template.cloneNode(true);
    var itemWidth = 25;
    var itemHeight = 70;
    var itemImg = item.querySelector('img');
    item.style.left = (obj.location.x - itemWidth) + 'px';
    item.style.top = (obj.location.y - itemHeight) + 'px';
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
        var item = window.map.makeItem(arr[i]);
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
