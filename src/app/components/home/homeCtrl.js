var app = angular.module('scores');
app.controller('homeCtrl', homeCtrl)

function homeCtrl($http, fixtureService, competitionsService, $filter, standingsService, $timeout, $window) {
  var vm = this;
  var date;

  function _init(){
    vm.tab = 0;
    vm.competitions;
    vm.con = false;
    vm.showTable = false;
    vm.compId;
    $filter('unique'); // include filter unique
    var today = new Date();
    vm.todayMonth = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    vm.todayDay = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    vm.todayMonth = vm.todayMonth.toString().trim();
    vm.todayDay = vm.todayDay.toString().trim();
  }
  _init();

  // Get fixtures data
  var getFixtures = function() {
    fixtureService.getFixtures()
      .then(function(fixtures) {
      vm.games = fixtures.fixtures;

      // Get competition names
      var getCompetitions = function() {
        competitionsService.getCompetitions()
          .then(function(competitions) {
          vm.competitions = competitions;
          angular.forEach(vm.games, function(value, key){
            var id = value._links.competition.href.substr(-3, value._links.competition.href.length);
            angular.forEach(vm.competitions, function(value2, key){
              if(parseInt(value2.id) === parseInt(id)){
                value.compCaption = value2.caption;
                value.competitionId = value2.id;
              }
            });
          });
        },
        function(data) {
          console.log('competitions retrieval failed.')
        });
      };
      getCompetitions();

      // Adjust some data as month and day to show '0' in front if less then '10', same as if resul null show '-'
      angular.forEach(vm.games, function(value, key){
        value.result.goalsHomeTeam = value.result.goalsHomeTeam === null ? '-' : value.result.goalsHomeTeam;
        value.result.goalsAwayTeam = value.result.goalsAwayTeam === null ? '-' : value.result.goalsAwayTeam;
        date = new Date(value.date);
        value.month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        value.day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        value.month = value.month.toString().trim();
        value.day = value.day.toString().trim();
        value.hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        value.minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      })
    },
    function(data) {
      console.log('games retrieval failed.')
    });
  };
  getFixtures();

  vm.setTab = function (tabId) {
    vm.tab = tabId;
  };
  vm.isSet = function (tabId) {
    return vm.tab === tabId;
  };

  // Get table with standings
  vm.getStandings = function(id, index) {
    var oppenedStand = angular.element(document.querySelectorAll('.table__standings'));
    var currentTable = document.querySelectorAll('.table__scores');
    var currentStand = angular.element(currentTable[index].querySelectorAll('.standings'));
    if(vm.showTable === true && currentStand.length === 1){
      vm.showTable = false;
      return false;
    }
    vm.showTable = false;
    standingsService.getStandings(id)
      .then(function(standings) {
      vm.standings = standings;
      if(vm.standings._links){
         vm.compId = vm.standings._links.competition.href.substr(-3, vm.standings._links.competition.href.length); 
         vm.compId = Number(vm.compId);
         vm.showTable = true;
      } else{
        alert(vm.standings.leagueCaption + ' table is not available for now!');
      }
    },
    function(data) {
      console.log('games retrieval failed.')
    });
  };
  //On date tabs click change date 
  vm.gameDay = function(day, month){
    vm.todayDay = day.toString().trim();
    vm.todayMonth = month.toString().trim();
    vm.showTable = false;
  }
  // Check if table has content, if true table will be shown else it will be hidden
  vm.content = function(index){
    var table = angular.element(document.querySelectorAll(".table > tbody"));
    var current = angular.element(table[index])
    var subCurrent = angular.element(table[index].querySelectorAll("tr"));
    if(subCurrent.length > 0 && subCurrent !== undefined){
      return true;
    } else {
      return false;
    }
  }
}