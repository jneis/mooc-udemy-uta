var app = angular.module('utaApp', []);

app.controller('ctrl', function($rootScope, $scope) {
    $scope.title = 'Udemy\'s Unit Testing AngularJS';

    $scope.destinations = [];

    $scope.destination = {
        city: undefined,
        country: undefined
    };

    $scope.add = function() {
        $scope.destinations.push({
            city: $scope.destination.city,
            country: $scope.destination.country
        });
    };
});
