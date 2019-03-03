var app = angular.module('scores');
app.directive('scorers', scorers)

function scorers($rootScope, scorersService) {
  var vm = this;
  vm.root = $rootScope.root;
  return {
    restrict: "A",
    scope:{
      scorer: "="
    },
    templateUrl: vm.root + "app/shared/scorers.html"
  };
}