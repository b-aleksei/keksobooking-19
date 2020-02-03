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
  for (var i = 0; i < 8; i++) {
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

var arrObjects = generateArr();

function fillDom() {
  var target = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrObjects.length; i++) {
    fragment.appendChild(makeItem(arrObjects[i]));
  }
  target.appendChild(fragment);
}

var mapFilters = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelectorAll('fieldset');
var mapPin = document.querySelector('.map__pin--main');
var formMain = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var PIN_MAIN_X = 32;
var PIN_MAIN_Y = 32;
var amountRooms = document.querySelector('#room_number');
var amountPlaces = document.querySelector('#capacity');

var getAddress = function (pinHeight, pinWidth) {
  var x = pinWidth || PIN_MAIN_X;
  var y = pinHeight || PIN_MAIN_Y;
  address.value = (mapPin.offsetLeft + x) + ', ' + (mapPin.offsetTop + y);
};
getAddress();

var disableFilter = function (boolean) {
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = boolean;
  }

  for (var j = 0; j < mapFeatures.length; j++) {
    mapFeatures[j].disabled = boolean;
  }
};

disableFilter(true);

var startActivity = function () {
  fillDom();
  disableFilter(false);
  formMain.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  getAddress(70);
};

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    startActivity();
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    startActivity();
  }
});

var checkValidity = function () {
  if (+amountRooms.value < +amountPlaces.value) {
    amountRooms.setCustomValidity('Количество комнат не может быть меньше количества гостей');
  } else {
    amountRooms.setCustomValidity('');
  }
};

amountRooms.addEventListener('change', function () {
  checkValidity();
});

amountPlaces.addEventListener('change', function () {
  checkValidity();
});
