var app = angular.module("scores", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/components/home/home.html",
        controller : "homeCtrl",
        controllerAs: 'hc'
    })

});