var app = angular.module('scores');

app.controller('homeCtrl', homeCtrl)

  function homeCtrl($http, fixtureService, competitionsService, $filter, standingsService, $timeout, $window) {
     var vm = this;
     var date;
     vm.competitions;
     vm.compId;
     vm.con = false;
     vm.showTable = false;
     vm.compId;
     vm.loaded = true;
   
     $filter('unique'); // include filter unique

     var today = new Date();
     vm.todayMonth = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
     vm.todayDay = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
     vm.todayMonth = vm.todayMonth.toString().trim();
     vm.todayDay = vm.todayDay.toString().trim();

     _init();

     function _init(){

       // Get fixtures data
       vm.getFixtures = function() {
            fixtureService.getFixtures()
                .then(function(fixtures) {
                  vm.loaded = true;
                  vm.games = fixtures.fixtures;

	          // Get competition names
		  vm.getCompetitions = function() {
                    competitionsService.getCompetitions()
		      .then(function(competitions) {

                       vm.competitions = competitions;
		       angular.forEach(vm.games, function(value, key){
			 var id = value._links.competition.href.substr(-3, value._links.competition.href.length);
			 angular.forEach(vm.competitions, function(value2, key){
			   if(value2.id == id){
			     value.compCaption = value2.caption;
		             value.competitionId = value2.id;
			   }

			 });
		       });
		       vm.loaded = false;
		      },
                      function(data) {
                      console.log('competitions retrieval failed.')
                      });
                  };
                  vm.getCompetitions();

		   // Adjust some data as month and day to show '0' in front if less then '10', same as if resul null show '-'
		   angular.forEach(vm.games, function(value, key){
			value.result.goalsHomeTeam = value.result.goalsHomeTeam == null ? '-' : value.result.goalsHomeTeam;
		        value.result.goalsAwayTeam = value.result.goalsAwayTeam == null ? '-' : value.result.goalsAwayTeam;
                       
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
	vm.getFixtures();
     }
        

        // Get table with standings
        vm.getStandings = function(id, index) {
	                  
			  var oppenedStand = angular.element(document.querySelectorAll('.table__standings'));
			  var currentTable = document.querySelectorAll('.scores__table');
                          var currentStand = angular.element(currentTable[index].querySelectorAll('.standing__wrapper'));

			   if(vm.showTable = true && currentStand.length == 1){
			      vm.showTable = false
			      vm.loaded = false;

			  } else if(vm.showTable = true && currentStand.length == 0 && oppenedStand.length == 1) {

                             vm.showTable = false;
                             vm.loaded = true;

			     standingsService.getStandings(id)
		              .then(function(standings) {
                                vm.standings = standings; 
			        vm.compId = vm.standings._links.competition.href.substr(-3, vm.standings._links.competition.href.length);
                                vm.compId = Number(vm.compId);

                                $timeout(function(){
				  vm.showTable = true;
                                  vm.loaded = false;
				},1200);

			    },
                            function(data) {
                              console.log('standings retrieval failed.');
                            });

			  } else if(vm.showTable == false){

                              vm.loaded = true;

                              standingsService.getStandings(id)
		              .then(function(standings) {
                                vm.standings = standings;
			        vm.compId = vm.standings._links.competition.href.substr(-3, vm.standings._links.competition.href.length);
                                vm.compId = Number(vm.compId);
                                vm.loaded = false;
                                vm.showTable = true;
			      },
                              function(data) {
                                console.log('standings retrieval failed.');
                              });
                              
			  }
                       };

  
    //On date tabs click change date 
    vm.gameDay = function(day, month, index){
      	vm.todayDay = day.toString().trim();
        vm.todayMonth = month.toString().trim();
        tab = angular.element( document.querySelectorAll(".tabs") );
        active = angular.element(tab[index]);
        tab.removeClass('active');
	active.addClass('active');
        vm.showTable = false;
    }
    
    // When data is poplated set first tab as active
    vm.load = function() {
	var tab = angular.element( document.querySelectorAll(".tabs") );
    	var active = angular.element(tab[0]);
    	active.addClass('active');
    }
  
    // Check if table has content, if true table will be shown else it will be hidden
    vm.content = function(index){
	var table = angular.element(document.querySelectorAll(".table > tbody"));
        var current = angular.element(table[index])
        var subCurrent = angular.element(table[index].querySelectorAll("tr"));
	if(subCurrent.length > 0 && subCurrent != undefined){
	   return true;
	} else {
	   return false;
        }
    }
   
  }
