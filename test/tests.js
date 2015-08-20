describe('Testing coinageCalc Controller', function() {
	var $rootScope,
	$scope,
	controller;

	beforeEach(function() {
		module('coinageApp');

		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('coinageController', {$scope: $scope});
		});
	});

	describe("Error Handling", function() {
		it("should not accept and empty string", function() {
			$scope.calculate();
			expect($scope.errorText).toBe('That is not a valid entry.');
		});
		it("should not accept any non-numeric character other than £ and p", function() {
			$scope.calculate('1x');
			expect($scope.errorText).toBe('That is not a valid entry.');
		});
		it("should not accept any non-numeric character other than £ and p complex", function() {
			$scope.calculate('£1x.0p');
			expect($scope.errorText).toBe('That is not a valid entry.');
		});
		it("should not accept any value that does not include a number", function() {
			$scope.calculate('£p');
			expect($scope.errorText).toBe('That is not a valid entry.');
		});
	});

	describe("Action Handlers", function() {
		it("should keep single digits single", function() {
			$scope.calculate(4);
			expect($scope.totalPence).toBe(4);
		});
		it("should keep double digits double", function() {
			$scope.calculate(85);
			expect($scope.totalPence).toBe(85);
		});
		it("should accept the pence sign", function() {
			$scope.calculate('197p');
			expect($scope.totalPence).toBe(197);
		});
		it("should accept decimal format", function() {
			$scope.calculate('1.87');
			expect($scope.totalPence).toBe(187);
		});
		it("should accept the pound sign in the decimal format", function() {
			$scope.calculate('£1.23');
			expect($scope.totalPence).toBe(123);
		});
		it("should accept the pound sign and single digit", function() {
			$scope.calculate('£2');
			expect($scope.totalPence).toBe(200);
		});
		it("should accept the pound sign and double digit", function() {
			$scope.calculate('£10');
			expect($scope.totalPence).toBe(1000);
		});
		it("should accept the pound and pence sign in the decimal format", function() {
			$scope.calculate('£1.87p');
			expect($scope.totalPence).toBe(187);
		});
		it("should accept the pound and pence signs", function() {
			$scope.calculate('£1p');
			expect($scope.totalPence).toBe(100);
		});
		it("should accept the pound and pence signs with no pence digit", function() {
			$scope.calculate('£1.p');
			expect($scope.totalPence).toBe(100);
		});
		it("should handles leading zeros", function() {
			$scope.calculate('001.41p');
			expect($scope.totalPence).toBe(141);
		});
		it("should round to two decimal points", function() {
			$scope.calculate('4.235p');
			expect($scope.totalPence).toBe(424);
		});
		it("should accept the pound and pence signs and round to two decimal points", function() {
			$scope.calculate('£1.257422457p');
			expect($scope.totalPence).toBe(126);
		});
	});

	describe("Initialization", function() {
		it("amount is empty", function() {
			expect($scope.amount).toBeUndefined();
		});
	});
});