'use strict';

(function () {

  var random = function (max, min) {
    var minValue = min ? min : 0;
    return minValue + Math.floor(Math.random() * (max + 1 - minValue));
  };


  var cutItemFromArr = function (arr) {
    return arr.splice(random(arr.length - 1), 1).toString();
  };

  var makeObj = function () {

    return {
      author: {avatar: 'img/avatars/user' + window.data.cutItemFromArr(window.data.avatarsUrl) + '.png'},
      offer: {
        title: window.data.cutItemFromArr(window.data.titleHouse),
        address: window.data.cutItemFromArr(window.data.locationHouse),
        price: window.data.cutItemFromArr(window.data.priceHouse),
        type: window.data.typeHouse[window.data.random(window.data.typeHouse.length - 1)],
        rooms: window.data.random(window.data.typeHouse.length),
        guests: window.data.random(window.data.ARR_LENGTH),
        checkin: window.data.checkinCheckout[window.data.random(window.data.checkinCheckout.length - 1)],
        checkout: window.data.checkinCheckout[window.data.random(window.data.checkinCheckout.length - 1)],
        features: window.data.featuresHouse[window.data.random(window.data.featuresHouse.length - 1)],
        description: window.data.descriptionHose[window.data.random(window.data.descriptionHose.length - 1)],
        photos: window.data.cutItemFromArr(window.data.photosHouse)
      },
      location: {
        x: window.data.random(window.data.map.offsetWidth, 1),
        y: window.data.random(window.data.MAP_Y_END, window.data.MAP_Y_START)
      }
    };
  };

  var generateArr = function () {
    var arr = [];
    for (var i = 0; i < window.data.ARR_LENGTH; i++) {
      var obj = window.data.makeObj();
      arr.push(obj);
    }
    return arr;
  };

  window.data = {
    ARR_LENGTH: 8,
    avatarsUrl: ['01', '02', '03', '04', '05', '06', '07', '08'],
    titleHouse: ['Квартира', 'Постоялый двор', 'Лачуга', 'Общежитие', 'Комуналка', 'Хостел', 'Отель', 'Часный дом'],
    locationHouse: ['100, 200', '600, 350', '480, 368', '684, 588', '621, 214', '547, 215', '879, 632', '789, 102'],
    priceHouse: ['500', '800', '1000', '1300', '1500', '2000', '3000', '4000'],
    typeHouse: ['palace', 'flat', 'house', 'bungalo'],
    checkinCheckout: ['12-00', '13-00', '14-00'],
    featuresHouse: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    descriptionHose: ['cool', 'the best', 'so so', 'awful'],
    photosHouse: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    map: document.querySelector('.map'),
    MAP_Y_START: 130,
    MAP_Y_END: 630,
    random: random,
    cutItemFromArr: cutItemFromArr,
    makeObj: makeObj,
    generateArr: generateArr
  };

})();
