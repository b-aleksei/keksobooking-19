'use strict';
var avatarsUrl = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleHouse = ['Квартира', 'Постоялый двор', 'Лачуга', 'Общежитие', 'Комуналка', 'Хостел', 'Отель', 'Часный дом'];
var locationHouse = ['100, 200', '600, 350', '480, 368', '684, 588', '621, 214', '547, 215', '879, 632', '789, 102'];
var priceHouse = ['500', '800', '1000', '1300', '1500', '2000', '3000', '4000'];
var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
var checkinCheckout = ['12-00', '13-00', '14-00'];
var featuresHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptionHose = ['cool', 'the best', 'so so', 'awful'];
var photosHouse = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var positionX = document.querySelector('.map').offsetWidth;

function random(max, min) {
  var minValue = min ? min : 0;
  return minValue + Math.floor(Math.random() * (max + 1 - minValue));
}

function cutItemFromArr(arr) {
  return arr.splice(random(arr.length - 1), 1).toString();
}

function makeObj() {
  return {
    author: {avatar: 'img/avatars/user' + cutItemFromArr(avatarsUrl) + '.png'},
    offer: {
      title: cutItemFromArr(titleHouse),
      address: cutItemFromArr(locationHouse),
      price: cutItemFromArr(priceHouse),
      type: typeHouse[random(typeHouse.length - 1)],
      rooms: random(4),
      guests: random(8),
      checkin: checkinCheckout[random(checkinCheckout.length - 1)],
      checkout: checkinCheckout[random(checkinCheckout.length - 1)],
      features: featuresHouse[random(featuresHouse.length - 1)],
      description: descriptionHose[random(descriptionHose.length - 1)],
      photos: cutItemFromArr(photosHouse)
    },
    location: {
      x: random(positionX, 1),
      y: random(630, 130)
    }
  };
}

function generateArr() {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    var obj = makeObj();
    arr.push(obj);
  }
  return arr;
}

document.querySelector('.map').classList.remove('map--faded');

function makeItem(obj) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var item = template.cloneNode(true);
  var itemWidth = 25;
  var itemHeight = 70;
  var itemImg = item.querySelector('img');
  item.style.left = (obj.location.x + itemWidth) + 'px';
  item.style.top = (obj.location.y + itemHeight) + 'px';
  itemImg.src = obj.author.avatar + '';
  itemImg.alt = obj.offer.title + '';
  return item;
}

var arrObjects = generateArr();

function fillDom() {
  var target = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrObjects.length; i++) {
    fragment.appendChild(makeItem(arrObjects[i]));
  }
  target.appendChild(fragment);
}

fillDom();

function makeCard() {

  var templateContent = document.querySelector('#card').content.children[0];
  templateContent.cloneNode(true);
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
  var obj = arrObjects[0];
  var popupFeaturesItems = templateContent.querySelector('.popup__features').children;
  for (var i = popupFeaturesItems.length - 1; i >= 0; i--) {
    if (!popupFeaturesItems[i].className.includes('--' + obj.offer.features, 0)) {
      popupFeaturesItems[i].remove();
    }
  }
  popupTitle.textContent = obj.offer.title;
  popupAddress.textContent = obj.offer.address;
  popupPrice.textContent = obj.offer.price + '₽/ночь';
  popupType.textContent = typeHouseRussian[typeHouse.indexOf(obj.offer.type)];
  popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  popupDescription.textContent = obj.offer.description;
  if (obj.offer.photos) {
    popupPhoto.src = obj.offer.photos;
  } else {
    popupPhotos.style.display = 'none';
  }
  popupAvatar.src = obj.author.avatar;
  return templateContent;
}

function createDomItemCard() {
  var target = document.querySelector('.map__filters-container');
  target.before(makeCard());
}
createDomItemCard();
