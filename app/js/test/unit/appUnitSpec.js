// jasmine's 'describe' defines a test suite
//    (suite name, suite function)
describe('app-test-suite', function() {

    // testing controller
    describe('controller-test', function() {

        //  jasmine's 'it' defines a single unit test
        //    (test name, test function)
        it('should initialize the title', function() {

            // angular-mocks' 'module' includes target module into test
            module('utaApp');

            // initializes the scope
            var scope = {};
            var ctrl;

            // angular-mocks' 'inject' injects components to test
            //    in this case, injected component is a controller
            inject(function($controller) {
                // (controller name, scope link)
                ctrl = $controller('ctrl', {$scope: scope});
            });

            // jasmine's 'toBeDefined' matcher
            expect(scope.title).toBeDefined();

            // jasmine's 'toBe' matcher
            expect(scope.title).toBe('Udemy\'s Unit Testing AngularJS');
        });

    });

});
