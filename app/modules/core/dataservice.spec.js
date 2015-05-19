
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
           expect(dataservice.storage).toBedefined(); 
        });
       
    });
});