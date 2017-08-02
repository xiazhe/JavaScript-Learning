angular.module("MyController", [])
    .controller("IndexController", ["$scope", "githubService", function ($scope, githubService) {
        $scope.name = "dreamapple";
        $scope.show = true;
        githubService.getPullRequests().then(function (result) {
            $scope.data = result;
        }, function (error) {
            $scope.data = "error!";
        }, function (progress) {
            $scope.progress = progress;
            $scope.show = false;
        });
    }]);