(function () {
    'use strict';

    angular
        .module('todoApp')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$http'];
    function AppController($scope, $http) {
        $scope.projectList = [];
        $scope.todoList = [];

        ////////////////

        function init() {
            var promise = $http({ method: 'GET', url: 'http://127.0.0.1:5000/projects' });


            promise.then(function (resp) {
                if (resp.status == 200) {
                    $scope.projectList = resp.data;
                }
            }, function (error) {
                console.log(error);
            });

        }

        init();
    }
})();