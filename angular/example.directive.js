(function() {
    'use strict';

    angular
        .module('teafish')
        .directive('exampleDirective', exampleDirective);

    exampleDirective.$inject = [];
    function exampleDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: demoController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function demoController () {
        
    }
})();