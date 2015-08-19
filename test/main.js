describe('Testing coinageCalc Directive', function() {
	var $rootScope,
	$scope,
	$compile,
	el,
	$el,
	$body = $('body'),
	simpleHtml = '<coinage-calc></coinage-calc>';

	beforeEach(function() {
		module('coinageApp','templates');

		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$compile = $injector.get('$compile');
			$scope = $rootScope.$new();
			el = $compile(angular.element(simpleHtml))($scope);
		});

		$body.append(el);
		$rootScope.$digest();

		$el = $('.module-wrapper');
	});


	afterEach(function () {
		$body.empty();
	});

	it("has an input", function() {
		expect($el.find('input').length).toBe(1);
	});
	it("has a button", function() {
		expect($el.find('button').length).toBe(1);
	});
});