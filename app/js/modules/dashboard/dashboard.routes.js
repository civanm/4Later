angular.module('app.dashboard').config(config);


/* @ngInject */
function config($stateProvider, $urlRouterProvider, $locationProvider) {


    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'Dashboard',
        controllerAs: 'board'
    });

}