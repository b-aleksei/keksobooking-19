'use strict';

(function () {

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

  var mapPins = document.querySelector('.map__pins');
  var arrObjects = window.data.generateArr();

  function fillDom() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrObjects.length; i++) {
      var item = makeItem(arrObjects[i]);
      item.dataset.id = i;
      fragment.appendChild(item);
    }
    mapPins.appendChild(fragment);
  }
  window.map = {
    fillDom: fillDom,
    arrObjects: arrObjects
  };

})();
