(function(angular) {
  'use strict';
angular.module('collapsetextExampleApp', ['lr.text']).
  controller('EventController', ['$scope', function($scope) {
   
    /*
     * expose the event object to the scope
     */
    $scope.clickMe = function() {
      $scope.longtext = 'Mr. Six is a grumpy old fixture on his Beijing back street, ready to scold or shoot a withering look.';
    };
    
    $scope.longtext = 'Mr. Six is a grumpy old fixture on his Beijing back street, ready to scold or shoot a withering look. ';

    
  }]);
})(window.angular);