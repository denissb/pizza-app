'use strict';

/* Directives */


angular.module('pizzaApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text("Pizza app " + version);
        };
    }]);
