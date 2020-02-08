'use strict';
var ARR_LENGTH = 8;
var avatarsUrl = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleHouse = ['Квартира', 'Постоялый двор', 'Лачуга', 'Общежитие', 'Комуналка', 'Хостел', 'Отель', 'Часный дом'];
var locationHouse = ['100, 200', '600, 350', '480, 368', '684, 588', '621, 214', '547, 215', '879, 632', '789, 102'];
var priceHouse = ['500', '800', '1000', '1300', '1500', '2000', '3000', '4000'];
var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
var checkinCheckout = ['12-00', '13-00', '14-00'];
var featuresHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptionHose = ['cool', 'the best', 'so so', 'awful'];
var photosHouse = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var positionX = map.offsetWidth;

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
  for (var i = 0; i < ARR_LENGTH; i++) {
    var obj = makeObj();
    arr.push(obj);
  }
  return arr;
}


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

var mapPins = document.querySelector('.map__pins');
var arrObjects = generateArr();

function fillDom() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrObjects.length; i++) {
    var item = makeItem(arrObjects[i]);
    item.dataset.id = i;
    fragment.appendChild(item);
  }
  mapPins.appendChild(fragment);
}

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
  popupType.textContent = typeHouseRussian[typeHouse.indexOf(obj.offer.type)];
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

var mapFilters = document.querySelectorAll('.map__filter, fieldset');
var mapPin = document.querySelector('.map__pin--main');
var formMain = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var PIN_MAIN_X = 32;
var PIN_MAIN_Y = 32;
var PIN_HEIGHT = 70;

var getAddress = function (pinHeight, pinWidth) {
  var x = pinWidth || PIN_MAIN_X;
  var y = pinHeight || PIN_MAIN_Y;
  address.value = (mapPin.offsetLeft - x) + ', ' + (mapPin.offsetTop - y);
};
getAddress();

var disableFilter = function () {
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = !mapFilters[i].disabled;
  }
};

disableFilter();
var activStatus = false;

var startActivity = function () {
  fillDom();
  disableFilter();
  formMain.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  getAddress(PIN_HEIGHT);
  activStatus = true;
};

var startFromClick = function (evt) {
  if (evt.button === 0 && !activStatus) {
    startActivity();
  }
};

var startFromKeydown = function (evt) {
  if (evt.key === 'Enter' && !activStatus) {
    startActivity();
  }
};

mapPin.addEventListener('mousedown', startFromClick, {once: true});
mapPin.addEventListener('keydown', startFromKeydown, {once: true});

// показ карточек по клику на иконке
var cardsClose = function (evt) {
  var card = map.querySelector('.popup');
  if (evt.key === 'Escape' && card) {
    card.remove();
    document.removeEventListener('keydown', cardsClose);
  }
};

map.addEventListener('click', function (evt) {
  document.addEventListener('keydown', cardsClose);
  var pin = evt.target.closest('.map__pin');
  var card = map.querySelector('.popup');
  var cardClose = evt.target.matches('.popup__close');
  if (card) {
    card.remove();
  }
  if (pin && !pin.matches('.map__pin--main')) {
    var id = +pin.dataset.id;
    createDomItemCard(arrObjects[id]);
  }
  if (cardClose) {
    card.remove();
  }
});

// валидация формы
var checkValidity = function (evt) {
  var amountRooms = formMain.querySelector('#room_number');
  var amountPlaces = formMain.querySelector('#capacity');
  var price = formMain.querySelector('#price');
  var type = formMain.querySelector('#type');
  var timein = formMain.querySelector('#timein');
  var timeout = formMain.querySelector('#timeout');
  var setPrice = function (number) {
    price.min = number;
    price.placeholder = number;
    price.setCustomValidity('');
  };
  var input = evt.target.id;
  switch (input) {
    case 'room_number' :
      amountPlaces.setCustomValidity('');
      if (amountRooms.value === '100' && amountPlaces.value !== '0') {
        amountRooms.setCustomValidity('Это количество комнат не для гостей');
      } else if (+amountRooms.value < +amountPlaces.value) {
        amountRooms.setCustomValidity('Количество комнат не может быть меньше количества гостей');
      } else {
        amountRooms.setCustomValidity('');
      }
      break;
    case 'capacity' :
      amountRooms.setCustomValidity('');
      if (amountPlaces.value === '0' && amountRooms.value !== '100') {
        amountPlaces.setCustomValidity('Пожалуйста выберите количество гостей');
      } else if (+amountRooms.value < +amountPlaces.value) {
        amountPlaces.setCustomValidity('Количество комнат не может быть меньше количества гостей');
      } else {
        amountPlaces.setCustomValidity('');
      }
      break;
    case 'price' :
      if (price.validity.rangeOverflow) {
        price.setCustomValidity('Максимальная цена 1000000');
      } else if (price.validity.rangeUnderflow) {
        price.setCustomValidity('Минимальная цена ' + price.min);
      } else {
        price.setCustomValidity('');
      }
      break;
    case 'type' :
      switch (type.value) {
        case 'bungalo' :
          setPrice(0);
          break;
        case 'flat' :
          setPrice(1000);
          break;
        case 'house' :
          setPrice(5000);
          break;
        case 'palace':
          setPrice(10000);
      }
      break;
    case 'timein' :
      timeout.value = timein.value;
      break;
    case 'timeout' :
      timein.value = timeout.value;
      break;
  }
};

formMain.addEventListener('change', checkValidity);

var title = formMain.querySelector('#title');
title.addEventListener('input', function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Минимальное кол-во символов 30');
  } else {
    title.setCustomValidity('');
  }
});
