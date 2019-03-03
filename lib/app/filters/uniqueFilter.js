"use strict";

var app = angular.module('scores');
app.filter('unique', function () {
  return function (collection, keyname) {
    var output = [],
        keys = [];
    angular.forEach(collection, function (item) {
      var key = item.competition[keyname];

      if (!key) {
        key = item[keyname];
      }

      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
});