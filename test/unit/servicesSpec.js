'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('pizzaApp.services'));

    describe('version', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('0.1');
        }));
    });

    describe('pouchDB', function () {
        it('should get instance of PouchDB', inject(function (pouchDb) {
            expect(pouchDb instanceof PouchDB).toBe(true);
        }));
    });

    describe('pouchWrapper', function () {
        it('should create an instance of pouchWrapper', inject(function (pouchWrapper) {
            expect(pouchWrapper.add).toBe(true);
        }));
    });
});
