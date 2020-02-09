'use strict';
var data = (function () {
  return new MakeData();

  function MakeData() {
    this.ARR_LENGTH = 8;
    this.avatarsUrl = ['01', '02', '03', '04', '05', '06', '07', '08'];
    this.titleHouse = ['Квартира', 'Постоялый двор', 'Лачуга', 'Общежитие', 'Комуналка', 'Хостел', 'Отель', 'Часный дом'];
    this.locationHouse = ['100, 200', '600, 350', '480, 368', '684, 588', '621, 214', '547, 215', '879, 632', '789, 102'];
    this.priceHouse = ['500', '800', '1000', '1300', '1500', '2000', '3000', '4000'];
    this.typeHouse = ['palace', 'flat', 'house', 'bungalo'];
    this.checkinCheckout = ['12-00', '13-00', '14-00'];
    this.featuresHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    this.descriptionHose = ['cool', 'the best', 'so so', 'awful'];
    this.photosHouse = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    this.map = document.querySelector('.map');
    this.MAP_Y_START = 130;
    this.MAP_Y_END = 630;
    this.random = random;
    this.cutItemFromArr = cutItemFromArr;
    this.makeObj = makeObj;
    this.generateArr = generateArr;
  }

  function random(max, min) {
    var minValue = min ? min : 0;
    return minValue + Math.floor(Math.random() * (max + 1 - minValue));
  }


  function cutItemFromArr(arr) {
    return arr.splice(random(arr.length - 1), 1).toString();
  }

  /* eslint-disable */
  function makeObj() {
    return {
      author: {avatar: 'img/avatars/user' + this.cutItemFromArr(this.avatarsUrl) + '.png'},
      offer: {
        title: this.cutItemFromArr(this.titleHouse),
        address: this.cutItemFromArr(this.locationHouse),
        price: this.cutItemFromArr(this.priceHouse),
        type: this.typeHouse[this.random(this.typeHouse.length - 1)],
        rooms: this.random(this.typeHouse.length),
        guests: this.random(this.ARR_LENGTH),
        checkin: this.checkinCheckout[this.random(this.checkinCheckout.length - 1)],
        checkout: this.checkinCheckout[this.random(this.checkinCheckout.length - 1)],
        features: this.featuresHouse[this.random(this.featuresHouse.length - 1)],
        description: this.descriptionHose[this.random(this.descriptionHose.length - 1)],
        photos: this.cutItemFromArr(this.photosHouse)
      },
      location: {
        x: this.random(this.map.offsetWidth, 1),
        y: this.random(this.MAP_Y_END, this.MAP_Y_START)
      }
    };
  }

  function generateArr() {
    var arr = [];
    for (var i = 0; i < this.ARR_LENGTH; i++) {
      var obj = this.makeObj();
      arr.push(obj);
    }
    return arr;
  }
  /* eslint-enable */
})();
