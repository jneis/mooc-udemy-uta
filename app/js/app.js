var app = angular.module('utaApp', []);

app.controller('ctrl', function($rootScope, $scope, $http, $timeout) {
    $scope.title = 'Udemy\'s Unit Testing AngularJS';
    
    $scope.apiKey = '74bff1932a0961251a0e5eeac034ed7f';

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

    $scope.remove = function(index) {
        $scope.destinations.splice(index, 1);
    };

    var convert = function(temp) {
        return Math.round(temp - 273);
    };

    $scope.weather = function(destination) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + destination.city + '&appid=' + $scope.apiKey)
            .then(function(resp) {
                if (resp.data.weather) {
                    destination.weather = {};
                    destination.weather.main = resp.data.weather[0].main;
                    destination.weather.temp = convert(resp.data.main.temp);
                } else {
                    $scope.message = 'City not found'
                }
            }, function(err) {
                $scope.message = 'Server error'
            });
    };

    $scope.messageWatcher = $scope.$watch('message', function() {
        if ($scope.message) {
            $timeout(function() {
                $scope.message = null;
            }, 3000);
        }
    });
});

app.filter('warmest', function() {
    return function(destinations, minimum) {
        var filtered = [];

        angular.forEach(destinations, function(destination) {
            if (destination.weather && destination.weather.temp && (destination.weather.temp >= minimum)) {
                filtered.push(destination);
            };
        });
        return filtered;
    };
});
