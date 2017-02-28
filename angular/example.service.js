(function () {
    'use strict';

    angular
        .module('teafish')
        .service('ExampleService', ExampleService);

    ExampleService.$inject = ['$scope'];
    function ExampleService($scope) {
        this.exposedFn = exposedFn;

        ////////////////

        function exposedFn() {

        }
    }
})();