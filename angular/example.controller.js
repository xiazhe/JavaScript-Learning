(function() {
'use strict';

    angular
        .module('teafish')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = ['$scope'];
    function ExampleController($scope) {
        var self = this;
        

        init();

        ////////////////

        function init() { }
    }
})();