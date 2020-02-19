'use strict';

(function () {

  var types = {
    flat: {
      ru: 'квартира',
      min: 1000
    },
    palace: {
      ru: 'дворец',
      min: 10000
    },
    bungalo: {
      ru: 'бунгало',
      min: 0
    },
    house: {
      ru: 'дом',
      min: 5000
    }
  };


  function makeCard(obj) {

    var template = document.querySelector('#card').content.children[0];
    var templateContent = template.cloneNode(true);
    var popupTitle = templateContent.querySelector('.popup__title');
    var popupAddress = templateContent.querySelector('.popup__text--address');
    var popupPrice = templateContent.querySelector('.popup__text--price');
    var popupType = templateContent.querySelector('.popup__type');
    var popupCapacity = templateContent.querySelector('.popup__text--capacity');
    var popupTime = templateContent.querySelector('.popup__text--time');
    var popupDescription = templateContent.querySelector('.popup__description');
    var popupPhotos = templateContent.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    var popupAvatar = templateContent.querySelector('.popup__avatar');
    var popupFeaturesItems = templateContent.querySelector('.popup__features');
    popupFeaturesItems.innerHTML = '';

    obj.offer.features.forEach(function (item) {
      popupFeaturesItems.innerHTML += '<li class=' + '\"popup__feature popup__feature--' + item + '\"></li>';
    });
    popupTitle.textContent = obj.offer.title;
    popupAddress.textContent = obj.offer.address;
    popupPrice.textContent = obj.offer.price + '₽/ночь';
    popupType.textContent = types[obj.offer.type].ru;
    popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    popupDescription.textContent = obj.offer.description;
    popupAvatar.src = obj.author.avatar;

    if (obj.offer.photos.length > 0) {
      popupPhoto.src = obj.offer.photos[0];
      for (var i = 1; i < obj.offer.photos.length; i++) {
        var clone = popupPhoto.cloneNode();
        clone.src = obj.offer.photos[i];
        popupPhotos.append(clone);
      }

    } else {
      popupPhotos.style.display = 'none';
    }
    return templateContent;
  }

  function createDomItemCard(obj) {
    var target = document.querySelector('.map__filters-container');
    target.before(makeCard(obj));
  }

  window.card = {
    make: makeCard,
    createDomItem: createDomItemCard,
    types: types
  };
})();
