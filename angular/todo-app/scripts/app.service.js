(function () {
    'use strict';

    angular
        .module('todoApp')
        .factory('todoService', todoService);

    todoService.$inject = ['$scope'];
    function todoService($scope) {
        var service = {
            exposedFn: exposedFn
        };

        return service;

        ////////////////
        function exposedFn() { }
    }
})();