
require('angular');
require('angular-mocks');
require('./dataservice');

describe('dataservice', function () {
    'use strict';

    var dataservice;

    beforeEach(function () {
        angular.mock.module('app.services');
        inject(function ($q) {
            deferred = $q;
        });
        
        //injects angular scopes to the controller
        inject(function (_dataservice_) {
            dataservice = _dataservice_;
        });
    });

    describe('service function definitions', function () {

        it('should have getSuggestions function', function () {
            expect(dataservice.getSuggestions).toBeDefined();
        });

        it('should have a storage function', function () {
            expect(dataservice.storage).toBeDefined();
        });
    });

    describe('storage todos services: ', function () {
        var storage;
        beforeEach(function () {
            storage = dataservice.storage;
        });

        it('should have a get function', function () {
            expect(storage.get).toBeDefined();
        });
        it('should have a set function', function () {
            expect(storage.set).toBeDefined();
        });
        it('should return an array from get', function () {
            var result = storage.get();
            expect(result).toBeDefined();
        });

        it('should add an item to the storage', function () {
            //cleans the list
            storage.set([]);

            var result = storage.get(),
                list = [{ item: 'a' }];
                
            //cleans the list
            storage.set([]);
            expect(result.length).toBe(0);          
             
            //sets the list
            storage.set(list);

            result = storage.get();
            expect(result.length).toBe(1);
        });
    });
});