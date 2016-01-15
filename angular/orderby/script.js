(function(angular) {
  'use strict';
angular.module('exampleApp', []).
  controller('EventController', ['$scope', function($scope) {
    //resources
    $scope.list = [
        {
          "order": 1,
          "name": "index",
          "children": [
            {
              "order": null,
              "children": []
            }
          ]
        },
        {
          "order": 9,
          "name": "about",
          "children": [
            {
              "order": null,
              "children": []
            }
          ]
        },
        {
          "order": 2,
          "name": "solution",
          "children": [
            {
              "order": null,
              "children": []
            }
          ]
        },
        {
          "order": 11,
          "name": "module",
          "children": [
            {
              "order": null,
              "children": []
            }
          ]
        },
        {
          "order": 100,
          "name": "help",
          "children": [
            {
              "order": null,
              "children": []
            }
          ]
        }
      ];


    /*
     * expose the event object to the scope
     */
    $scope.clickMe = function() {
      $scope.entropy = new Date().getTime();
    };
    


   

    
  }]);
})(window.angular);