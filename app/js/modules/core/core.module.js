(function () {
    'use strict';
    require('./router');    
    require('./dataservice');

    angular.module('app.core', [
        'app.router',
        'app.services',
        'ngAnimate'
    ]);
})();