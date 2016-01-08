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

      var item = counter.toString();
      
      $scope.names.push(item);

      $scope.names[0] = $scope.names[0] + item;
      
      //console.log(angular.toJson($scope.names));
      //$scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    };
    
    $scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    
    
    
    
  }]);
})(window.angular);