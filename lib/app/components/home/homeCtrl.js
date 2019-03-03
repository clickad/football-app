"use strict";

var app = angular.module('scores');
app.controller('homeCtrl', homeCtrl);

function homeCtrl($http, fixtureService, scorersService, $filter, standingsService, $timeout, $window, $rootScope) {
  var vm = this;
  var date;

  function _init() {
    vm.tab = 0;
    vm.competitions;
    vm.con = false;
    vm.showTable = false;
    vm.showTable2 = false;
    vm.compId;
    $filter('unique');
    var today = new Date();
    today.setDate(today.getDate() - 1);
    vm.todayYear = today.getFullYear();
    vm.todayMonth = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    vm.todayDay = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    vm.todayMonth = vm.todayMonth.toString().trim();
    vm.todayDay = vm.todayDay.toString().trim();
    vm.todayDate = vm.todayYear + "-" + vm.todayMonth + "-" + vm.todayDay;
    var date2 = new Date();
    date2.setDate(date2.getDate() + 6);
    vm.todayYear2 = date2.getFullYear();
    vm.todayMonth2 = date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1;
    vm.todayDay2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate();
    vm.todayMonth2 = vm.todayMonth2.toString().trim();
    vm.todayDay2 = vm.todayDay2.toString().trim();
    vm.date2Date = vm.todayYear2 + "-" + vm.todayMonth2 + "-" + vm.todayDay2;
  }

  _init(); // Get fixtures data


  var getFixtures = function getFixtures() {
    fixtureService.getFixtures(vm.todayDate, vm.date2Date).then(function (fixtures) {
      vm.games = fixtures.matches; // Adjust some data as month and day to show '0' in front if less then '10'

      angular.forEach(vm.games, function (value, key) {
        date = new Date(value.utcDate);
        value.month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        value.day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        value.month = value.month.toString().trim();
        value.day = value.day.toString().trim();
        value.hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        value.minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      });
    }, function (data) {
      console.log('games retrieval failed.');
    });
  };

  getFixtures();
  setInterval(function () {
    $rootScope.firstLoad = true;
    getFixtures();
  }, 120000);

  vm.setTab = function (tabId) {
    vm.tab = tabId;
  };

  vm.isSet = function (tabId) {
    return vm.tab === tabId;
  }; // Get table with standings


  vm.getStandings = function (id, index) {
    $rootScope.firstLoad = false;
    var oppenedStand = angular.element(document.querySelectorAll('.table__standings'));
    var currentTable = document.querySelectorAll('.table__scores');
    var currentStand = angular.element(currentTable[index].querySelectorAll('.standings'));

    if (vm.showTable === true && currentStand.length === 1) {
      vm.showTable = false;
      return false;
    }

    vm.showTable = false;
    standingsService.getStandings(id).then(function (standings) {
      vm.standings = standings.standings;

      if (standings.competition.id) {
        vm.compId = standings.competition.id;
        vm.compId = Number(vm.compId);
        vm.showTable = true;
        vm.showTable2 = false;
      } else {
        alert('Table is now not available!');
      }
    }, function (data) {
      console.log('games retrieval failed.');
    });
  };

  vm.getScorers = function (id, index) {
    $rootScope.firstLoad = false;
    var oppenedStand = angular.element(document.querySelectorAll('.table__standings'));
    var currentTable = document.querySelectorAll('.table__scores');
    var currentStand = angular.element(currentTable[index].querySelectorAll('.standings'));

    if (vm.showTable2 === true && currentStand.length === 1) {
      vm.showTable2 = false;
      return false;
    }

    scorersService.getScorers(id).then(function (scorers) {
      vm.scorers = scorers;

      if (vm.scorers.competition.id) {
        vm.compId2 = vm.scorers.competition.id;
        vm.compId2 = Number(vm.compId2);
        vm.showTable = false;
        vm.showTable2 = true;
      } else {
        alert('Table is now not available!');
      }
    }, function (data) {
      console.log('Scorers retrieval failed.');
    });
  }; //On date tabs click change date 


  vm.gameDay = function (day, month) {
    vm.todayDay = day.toString().trim();
    vm.todayMonth = month.toString().trim();
    vm.showTable = false;
    vm.showTable2 = false;
  }; // Check if table has content, if true table will be shown else it will be hidden


  vm.content = function (index) {
    var table = angular.element(document.querySelectorAll(".table > tbody"));
    var current = angular.element(table[index]);
    var subCurrent = angular.element(table[index].querySelectorAll("tr"));

    if (subCurrent.length > 0 && subCurrent !== undefined) {
      return true;
    } else {
      return false;
    }
  };
}