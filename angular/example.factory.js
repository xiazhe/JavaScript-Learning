(function() {
'use strict';

    angular
        .module('teafish')
        .factory('exampleService', exampleService);

    exampleService.$inject = ['$scope'];
    function exampleService($scope) {
        var service = {
            exposedFn:exposedFn
        };
        
        return service;

        ////////////////
        function exposedFn() { }
    }
})();