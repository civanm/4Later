(function () {
    angular.module('app.router', ['ui.router'])
        .config(config);


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/core/home.html'
        });
        $urlRouterProvider.otherwise('/home');
    }

} ());