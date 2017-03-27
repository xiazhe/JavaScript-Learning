(function() {
'use strict';

    angular
        .module('teafish')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = ['$scope'];
    function ExampleController($scope) {
        var self = this;
        
        self.doSomeThing = doSomeThing;

        init();

        ////////////////

        function init() { }

        function doSomeThing(){
            console.log('do something');
        }
    }
})();