(function () {
    angular.module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($scope, $mdSidenav) {
        var shell = this;        

        shell.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };
    }


}());