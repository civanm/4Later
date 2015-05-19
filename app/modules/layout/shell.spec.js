require('angular');
require('angular-mocks');
require('angular-material');
require('./layout.module');
require('./shell');

var mocks = require('../../mocks/mocks');

describe('Layout Shell', function () {
    'use strict';

    var deferred, scope, shell, translateServiceMock, dataservice;

    beforeEach(function () {
        angular.mock.module('app.layout');
        inject(function ($q) {
            deferred = $q;
        });

        var mockedDeferred = deferred(function (resolve, reject) {
            resolve({});
        });

        //override mocks services with fake deferreds
        mocks.dataservice = {
            getProfileInfo: function () {
                return mockedDeferred;
            },
            getStatistics: function () {
                return mockedDeferred;
            },
            getSentEmails: function () {
                return mockedDeferred;
            }
        };

        //injects angular scopes to the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            shell = $controller('Shell', {
                $scope: scope,
                $mdSidenav: mocks.$mdSidenav
            });
        });
    });
    
    it('should have a toggle navigation function', function () {
        expect(shell.toggleSidenav).toBeDefined();
    });
    
});