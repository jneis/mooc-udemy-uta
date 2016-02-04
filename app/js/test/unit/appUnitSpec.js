// jasmine's 'describe' defines a test suite
//    (suite name, suite function)
describe('app-test-suite', function() {

    // angular-mocks' 'module' includes target module into test
    beforeEach(module('utaApp'));

    // testing controller
    describe('controller-test', function() {
        var scope, ctrl;

        beforeEach(
            // angular-mocks' 'inject' injects components to test
            //    in this case, injected component is a controller
            inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                // (controller name, scope link)
                ctrl = $controller('ctrl', {$scope: scope});
            })
        );

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

    });

});
