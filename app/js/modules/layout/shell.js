(function () {
    angular.module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($scope, $mdSidenav, dataservice) {
        var shell = this;        

        shell.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };
    }


}());