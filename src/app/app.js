var app = angular.module("scores", ['ngRoute']);

app.run(function($rootScope) {
  $rootScope.root = 'file:///C:/Users/dam37153/Desktop/pr/libary/portf/pages/scores/';
})

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/components/home/home.html",
        controller : "homeCtrl",
        controllerAs: 'hc'
    })

});