var assert = require('assert');
const { celsiusToFrehenheit, frehenheitToCelsius } = require('../app');



describe(
    'Temperature Conversion',
    function () {
        describe(
            'Converts Celsius To Frehenheit',
            function () {
                // tests here
                it('should convert -40 celsius to -40 fahrenheit', function () {
                    assert.equal(-40, celsiusToFrehenheit(-40));
                });

                it('should convert 0 celsius to 32 fahrenheit', function () {
                    assert.equal(32, celsiusToFrehenheit(0));

                });

                it('should return undefined if input is an empty string', function () {
                    assert.equal(undefined, celsiusToFrehenheit(''));
                });

                it('should return undefined if input is not a number', function () {
                    assert.equal(undefined, celsiusToFrehenheit('thirtyseven'));
                });
            });
        describe(
            'Converts Frehenheit To Celsius',
            function () {
                // tests here

                it('should convert -40 fahrenheit to -40 celsius', function () {
                    assert.equal(-40, frehenheitToCelsius(-40));
                });
                it('should convert 32 fahrenheit to 0 celsius', function () {
                    assert.equal(0, frehenheitToCelsius(32));
                });
                it('should return undefined if input is an empty string', function () {
                    assert.equal(undefined, frehenheitToCelsius(''));
                });

                it('should return undefined if input is not a number', function () {
                    assert.equal(undefined, frehenheitToCelsius('thirtyseven'));
                });

            });
    });