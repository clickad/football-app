"use strict";

angular.module('scores').factory('standingsService', standingsService);
standingsService.$inject = ['$http', '$q'];

function standingsService($http, $q) {
  var service = {
    standings: [],
    getStandings: getStandings
  };
  return service;

  function getStandings(id) {
    var def = $q.defer(id);
    $http({
      method: 'GET',
      url: 'https://api.football-data.org/v2/competitions/' + id + '/standings',
      headers: {
        'X-Auth-Token': '92c212ebba4842ef95b0958290d908ce'
      }
    }).success(function (data, status) {
      service.standings = data;
      def.resolve(data);
    }).error(function (data, status) {
      alert("There is a problem with your network, please try again....");
    });
    return def.promise;
  }
}