'use strict';

// Declare app level module which depends on filters, and services
angular.module('pizzaApp', [
    'ngRoute',
    'pizzaApp.filters',
    'pizzaApp.services',
    'pizzaApp.directives',
    'pizzaApp.controllers'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pizzas', {
            templateUrl: 'partials/pizzas.html',
            controller: 'ViewCtrl'
        });
        $routeProvider.when('/add-pizza', {
            templateUrl: 'partials/add-pizza.html',
            controller: 'AddCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/pizzas'
        });
    }]);
