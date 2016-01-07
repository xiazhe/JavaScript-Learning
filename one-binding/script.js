(function(angular) {
  'use strict';
angular.module('oneTimeBidingExampleApp', []).
  controller('EventController', ['$scope', function($scope) {
    var counter = 0;
    var names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    /*
     * expose the event object to the scope
     */
    $scope.clickMe = function(clickEvent) {
      $scope.name = names[counter % names.length];
      counter++;
      
      $scope.names.push(counter);
      
      //console.log(angular.toJson($scope.names));
      //$scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    };
    
    $scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    
    
    
    
  }]);
})(window.angular);