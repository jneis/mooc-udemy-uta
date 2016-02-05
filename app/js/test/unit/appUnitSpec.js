// jasmine's 'describe' defines a test suite
//    (suite name, suite function)
describe('app-test-suite', function() {

    // angular-mocks' 'module' includes target module into test
    beforeEach(module('utaApp'));

    // testing controller
    describe('controller-test', function() {
        var scope, ctrl, httpBackend, timeout, rootScope;

        beforeEach(
            // angular-mocks' 'inject' injects components to test
            //    in this case, injected components are: controller, http service, timeout util
            inject(function($controller, $rootScope, $httpBackend, $timeout) {
                scope = $rootScope.$new();
                rootScope = $rootScope;
                httpBackend = $httpBackend;
                timeout = $timeout;
                // (controller name, scope link)
                ctrl = $controller('ctrl', {$scope: scope});
            })
        );

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        //  jasmine's 'it' defines a single unit test
        //    (test name, test function)
        it('should initialize the title', function() {

            // jasmine's 'toBeDefined' matcher
            expect(scope.title).toBeDefined();

            // jasmine's 'toBe' matcher
            expect(scope.title).toBe('Udemy\'s Unit Testing AngularJS');
        });

        it('should add destination to list', function() {
            expect(scope.destinations).toBeDefined();
            expect(scope.destinations.length).toBe(0);

            scope.destination = {
                city: 'London',
                country: 'UK'
            };

            scope.add();

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe('London');
            expect(scope.destinations[0].country).toBe('UK');
        });

        it('should remove destination from list', function() {
            scope.destinations = [{
                city: 'Paris',
                country: 'France'
            }];

            expect(scope.destinations.length).toBe(1);

            scope.remove(0);

            expect(scope.destinations.length).toBe(0);
        });

        it('should remove error message after timeout', function() {
            rootScope.message = 'some error message';

            expect(rootScope.message).toBe('some error message');

            rootScope.$apply();
            timeout.flush();

            expect(rootScope.message).toBe(null);
        });

    });

    // testing filters
    describe('filter-test', function() {
        it('should return only warm destinations', inject(function($filter) {
            var warmest = $filter('warmest');
            var destinations = [
                { city: 'Beijing', country: 'China', weather: {temp: 21}},
                { city: 'Moscow', country: 'Russia'},
                { city: 'Lima', country: 'Peru', weather: {temp: 25}}
            ];

            expect(destinations.length).toBe(3);

            var filtered = warmest(destinations, 22);

            expect(filtered.length).toBe(1);
        }));
    });

    // testing directives
    describe('directive-test', function() {
        var scope, template, httpBackend, isolateScope;

        beforeEach(inject(function($compile, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            
            scope.dest = {city: 'Tokyo', country: 'Japan'};
            scope.apiKey = 'xyz';

            var element = angular.element('<div ng-dir-destination dest="dest" api-key="apiKey" on-remove="remove()"></div>');

            template = $compile(element)(scope);
            scope.$digest();
            isolateScope = element.isolateScope();
        }));

        it('should update weather for destination', function() {
            scope.destination = {
                city: 'Sydney',
                country: 'Australia'
            };

            httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + scope.destination.city + '&appid=' + scope.apiKey)
                .respond({
                    weather: [{
                        main: 'Rain',
                        detail: 'Light rain'
                    }],
                    main: {
                        temp: 288
                    }
                });

            isolateScope.weather(scope.destination);

            httpBackend.flush();

            expect(scope.destination.weather.main).toBe('Rain');
            expect(scope.destination.weather.temp).toBe(15);
        });

        it('should call parent\'s controller remove function', function() {
            scope.removeCounter = 1;

            scope.remove = function() {
                scope.removeCounter++;
            };

            isolateScope.onRemove();

            expect(scope.removeCounter).toBe(2);
        });

        it('should generate the correct html', function() {
            var html = template.html();

            expect(html).toContain('Tokyo, Japan');

            scope.dest.city = 'London';
            scope.dest.country = 'UK';

            scope.$digest();
            html = template.html();

            expect(html).toContain('London, UK');
        });
    });

});
