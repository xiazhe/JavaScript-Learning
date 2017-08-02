angular.module("MyApp", ["ngRoute", "MyController", "MyService"])
.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "views/home.html",
        controller: "IndexController"
    });
}]);