"use strict";

angular.module('scores').factory('scorersService', scorersService);
scorersService.$inject = ['$http', '$q'];

function scorersService($http, $q) {
  var service = {
    scorers: [],
    getScorers: getScorers
  };
  return service;

  function getScorers(id) {
    var def = $q.defer();
    $http({
      method: 'GET',
      url: 'https://api.football-data.org/v2/competitions/' + id + '/scorers',
      headers: {
        'X-Auth-Token': '92c212ebba4842ef95b0958290d908ce'
      }
    }).success(function (data, status) {
      service.scorers = data;
      def.resolve(data);
    }).error(function (data, status) {
      alert("There is a problem with your network, please try again....");
    });
    return def.promise;
  }
}