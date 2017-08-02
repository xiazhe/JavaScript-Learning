angular.module("MyService", [])
.factory('githubService', ["$q", "$http", function ($q, $http) {
    var getPullRequests = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        $http.get("https://api.github.com/repos/angular/angular.js/pulls")
        .success(function (data) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                result.push(data[i].user);
                progress = (i + 1) / data.length * 100;
                deferred.notify(progress);
            }
            deferred.resolve(result);
        })
        .error(function (error) {
            deferred.reject(error);
        });
        return promise;
    }

    return {
        getPullRequests: getPullRequests
    };
}]);
