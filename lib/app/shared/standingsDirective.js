"use strict";

var app = angular.module('scores');
app.directive('standings', standings);

function standings($http, $rootScope, standingsService, $timeout) {
  var vm = this;
  vm.root = $rootScope.root;
  return {
    restrict: "A",
    scope: {
      stand: "="
    },
    templateUrl: vm.root + "app/shared/table.html"
  };
}