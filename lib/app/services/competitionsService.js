"use strict";

angular.module('scores').factory('competitionsService', competitionsService);
competitionsService.$inject = ['$http', '$q'];

function competitionsService($http, $q) {
  var service = {
    competitions: [],
    getCompetitions: getCompetitions
  };
  return service;

  function getCompetitions() {
    var def = $q.defer();
    $http({
      method: 'GET',
      url: 'https://api.football-data.org/v1/competitions',
      headers: {
        'X-Auth-Token': '92c212ebba4842ef95b0958290d908ce'
      }
    }).success(function (data, status) {
      service.competitions = data;
      def.resolve(data);
    }).error(function (data, status) {
      alert("There is a problem with your network, please try again....");
    });
    return def.promise;
  }
}