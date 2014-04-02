'use strict';

/* Filters */

angular.module('pizzaApp.filters', []).filter('bitcoin', function () {
    return function (sum) {
        if (!isNaN(sum) && sum > 0) {
            return sum + " \u0E3F";
        }
        return "--";
    }
});
