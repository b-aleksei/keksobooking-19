'use strict';

(function () {

  window.map = {
    response: [],
    makeItem: makeItem,
    fillDom: fillDom
  };

  var mapPins = document.querySelector('.map__pins');
  var AMOUNT_PINS = 5;

  function makeItem(obj) {
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
  }

  function fillDom() {
    var fragment = document.createDocumentFragment();
    window.load.data(function (arr) {
      window.map.response = arr;
      for (var i = 0; i < AMOUNT_PINS; i++) {
        var item = window.map.makeItem(arr[i]);
        item.dataset.id = i;
        fragment.appendChild(item);
      }
      mapPins.appendChild(fragment);
    }, window.load.badRequest);
  }

})();
