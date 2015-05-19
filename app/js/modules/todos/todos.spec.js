require('angular');
require('angular-mocks');
require('angular-material');
require('./todos.module');
require('./todos');

var mocks = require('../../mocks/mocks');

describe('Todos', function () {
    'use strict';

    var deferred, scope, shell, translateServiceMock, dataservice;

    beforeEach(function () {
        angular.mock.module('app.todos');
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
            shell = $controller('Todos', {
                $scope: scope,
                dataservice: mocks.dataservice
            });
        });
    });
});