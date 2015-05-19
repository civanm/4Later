angular.module('app.todos').config(config);

/* @ngInject */
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('todos', {
        url: '/todos',
        templateUrl: 'views/todos/todos.html',
        controller: 'Todos',
        controllerAs: 'todos'
    });

}