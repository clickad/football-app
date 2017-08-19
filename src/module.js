var app = angular.module("scores", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller : "homeCtrl",
        controllerAs: 'hc'
    })

});
