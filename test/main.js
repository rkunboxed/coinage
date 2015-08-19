describe('Testing coinageCalc Directive', function() {
	var scope,
		elem,
		directive,
		compiled,
		html,
		$httpBackend;

	beforeEach(function() {
		//load the module
		module('coinageApp');

		//set our view
		html = '<coinage-calc></coinage-calc>';

		inject(function($compile, $rootScope, $injector) {
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET('/app/coinage/coinage.html').respond(200, '');
			scope = $rootScope.$new();
			elem = angular.element(html);
			compiled = $compile(elem);
			compiled(scope);
			scope.$digest();
		});
	});

	it("should be true", function() {
		// super basic test 
		expect(true).toBe(true);
	});
});