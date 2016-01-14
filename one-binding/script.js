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
      var randomNum = new Date().getTime();
      
      $scope.names.push(item);

      $scope.names[0] = $scope.names[0] + item;
      $scope.persons[0].name += item;

      $scope.persons.push({'name': randomNum, 'age': item});
      
      //console.log(angular.toJson($scope.names));
      //$scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
    };
    
    $scope.names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];

    $scope.persons = [{
      name: 'Igor',
      age: 10
    },
    {
      name: 'Misko',
      age: 20
    },
    {
      name: 'Chirayu',
      age: 30
    },
    {
      name: 'Lucas',
      age: 40
    }];
    
    
    
    
  }]);
})(window.angular);