"use strict";

angular.module('scores').factory('fixtureService', fixtureService);
fixtureService.$inject = ['$http', '$q'];

function fixtureService($http, $q) {
  var service = {
    fixtures: [],
    getFixtures: getFixtures
  };
  return service;

  function getFixtures() {
    var def = $q.defer();
    $http({
      method: 'GET',
      url: 'https://api.football-data.org/v1/fixtures',
      headers: {
        'X-Auth-Token': '92c212ebba4842ef95b0958290d908ce'
      }
    }).success(function (data, status) {
      service.fixtures = data;
      def.resolve(data);
    }).error(function (data, status) {
      alert("There is a problem with your network, please try again....");
    });
    return def.promise;
  }
}