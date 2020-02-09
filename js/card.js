'use strict';

window.card = (function () {

  function makeCard(obj) {

    var template = document.querySelector('#card').content.children[0];
    var templateContent = template.cloneNode(true);
    var popupTitle = templateContent.querySelector('.popup__title');
    var popupAddress = templateContent.querySelector('.popup__text--address');
    var popupPrice = templateContent.querySelector('.popup__text--price');
    var popupType = templateContent.querySelector('.popup__type');
    var typeHouseRussian = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
    var popupCapacity = templateContent.querySelector('.popup__text--capacity');
    var popupTime = templateContent.querySelector('.popup__text--time');
    var popupDescription = templateContent.querySelector('.popup__description');
    var popupPhotos = templateContent.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    var popupAvatar = templateContent.querySelector('.popup__avatar');
    var popupFeaturesItems = templateContent.querySelector('.popup__features').children;
    for (var i = popupFeaturesItems.length - 1; i >= 0; i--) {
      if (!popupFeaturesItems[i].classList.contains('popup__feature--' + obj.offer.features)) {
        popupFeaturesItems[i].remove();
      }
    }
    popupTitle.textContent = obj.offer.title;
    popupAddress.textContent = obj.offer.address;
    popupPrice.textContent = obj.offer.price + '₽/ночь';
    popupType.textContent = typeHouseRussian[window.data.typeHouse.indexOf(obj.offer.type)];
    popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    popupDescription.textContent = obj.offer.description;
    popupAvatar.src = obj.author.avatar;
    if (obj.offer.photos) {
      popupPhoto.src = obj.offer.photos;
    } else {
      popupPhotos.style.display = 'none';
    }
    return templateContent;
  }

  function createDomItemCard(obj) {
    var target = document.querySelector('.map__filters-container');
    target.before(makeCard(obj));
  }
  return {
    makeCard: makeCard,
    createDomItemCard: createDomItemCard
  };
})();
