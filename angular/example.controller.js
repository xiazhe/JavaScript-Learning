(function() {
'use strict';

    angular
        .module('teafish')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = ['$scope'];
    function ExampleController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();