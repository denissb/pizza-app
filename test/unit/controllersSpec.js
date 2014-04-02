'use strict';

/* jasmine specs for controllers go here */

describe('pizzaApp controllers', function () {
    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('pizzaApp.controllers'));

    describe('ViewCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            ctrl = $controller('ViewCtrl', {$scope: scope});
        }));
    });
});
