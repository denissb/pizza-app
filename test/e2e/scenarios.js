'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

    it('should redirect index.html to index.html#/pizzas', function() {
        browser().navigateTo('app/index.html');
        expect(browser().location().url()).toBe('/pizzas');
    });

    describe('Pizzas view', function() {

        beforeEach(function() {
            browser().navigateTo('app/index.html#/pizzas');
        });

        it('should render view1 when user navigates to /pizzas', function() {
            expect(browser().location().url()).toBe('/pizzas');
        });

        it('should show pizzas view when user navigates to it via nav', function() {
            element('.nav-tabs li:nth-child(1) a').click();
            expect(browser().location().url()).toBe('/pizzas');
        });

        it('should show the active tab on pizzas', function() {
            element('.nav-tabs li:nth-child(1) a').click();
            expect(element('.nav-tabs li:nth-child(1)').attr('class')).toBe('active');
        });
    });
});
