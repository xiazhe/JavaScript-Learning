var svc = angular.module('twoway.services', []);

svc.factory('helpers', function(appconstant) {

    var helpers = {

        watchersContainedIn: function(scope) {
            var watchers = (scope.$$watchers) ? scope.$$watchers.length : 0;
            var child = scope.$$childHead;
            while (child) {
                watchers += (child.$$watchers) ? child.$$watchers.length : 0;
                child = child.$$nextSibling;
            }
            return watchers;
        },

        randomGender: function() {
            return (Math.floor(Math.random() * 2) % 2 === 0) ? 'M' : 'F';
        },

        randomAge: function() {
            return Math.floor(Math.random() * 90) + 1;
        },

        randomName: function(length) {
            var nome = "";
            for (var i = 0; i < length; i++)
                nome += appconstant.letters.charAt(Math.floor(Math.random() * appconstant.letters.length));
            return nome;
        },

        randomUrl: function() {
            return (Math.floor(Math.random() * 2) % 2 === 0) ? 'http://www.' + (helpers.randomName(20) + '.' + helpers.randomName(2)).toLowerCase() : '';
        }
    }

    return helpers;
});

svc.constant('appconstant', {
    letters : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    
    avatars: {
        'M': 'https://lh6.googleusercontent.com/-gBENMhxC2LI/AAAAAAAAAAI/AAAAAAAAAAA/PptO98mEIlE/s32-c-mo/photo.jpg',
        'F': 'https://lh6.googleusercontent.com/-gBENMhxC2LI/AAAAAAAAAAI/AAAAAAAAAAA/PptO98mEIlE/s32-c-mo/photo.jpg'
    },

    ageColors: {
        average: {},
        minor: {
            'background-color': 'red',
            color: 'white'
        },
        senior: {
            'background-color': 'brown',
            color: 'yellow'
        },
    }
});