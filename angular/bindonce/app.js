var app = angular.module('twoway', ['twoway.services', 'pasvaz.bindonce']);

app.controller('MainCtrl', function($scope, $timeout, appconstant, helpers) {
    $scope.loadPersons = function(number) {
        var gender = '?';
        for (var i = 0; i < number; i++) {
            gender = helpers.randomGender();
            $scope.Persons.push({
                firstname: helpers.randomName(8),
                lastname: helpers.randomName(8),
                age: helpers.randomAge(),
                gender: gender,
                picture: appconstant.avatars[gender],
                url: helpers.randomUrl()
            });
        }
        $scope.wcount();
    };

    $scope.ageColor = function(age) {
        // Do you want to see how many dirty checking run? Uncomment next line
        // console.log('Dirty Checking running', (new Date()));
        var color = (age < 18) ? 'minor' : ((age > 60) ? 'senior' : 'average');
        return appconstant.ageColors[color];
    };

    $scope.reset = function() {
        $scope.name = "";
        $scope.Persons = [{
            firstname: 'Pasquale',
            lastname: 'Vazzana',
            age: 28,
            gender: 'M',
            picture: appconstant.avatars['M'],
            link: ''
        }];

        $scope.wcount();
    };

    $scope.wcount = function() {
        $timeout(function() {
            $scope.watchers = helpers.watchersContainedIn($scope);
        });
    };

    $scope.reset();

    $scope.clickMe = function($event){


    }
});