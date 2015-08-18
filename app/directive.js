(function() {
	'use strict';

	angular
		.module('coinageApp')
		.directive('coinageCalc', coinageCalc);

		function coinageCalc() {
			var directive = {
				restrict: 'E',
				templateUrl: '/app/template.html',
				scope: {},
				link: linkFunction
			}

			return directive;



			function linkFunction($scope, $elem, $attrs) {
				// set all the initial values to 0
				var coins = {
						pence200: 0,
						pence100: 0,
						pence50: 0,
						pence2: 0,
						pence1: 0
					},
					totalPence,
					errorText ='';

				// make the values accessible to the template
				$scope.coins = coins;
				$scope.totalPence = totalPence;
				$scope.errorText = errorText;

				$scope.calculate = calculate;

				function calculate(value) {
					var newNum,
						roundedNum,
						pattern = /[^0-9.-]+/g; // get rid of the symbols

					// check to make sure the value doesn't include any disallowed characters
					// @TODO £ can only start the string value.match(/^£/)
					// @TODO p can only end the string value.match(/p$/)
					// if the value starts with the £ or has a decimal then multiply by 100
					// remove leading zeros

					if (value.match(/[^£p.\d]/)) {
						$scope.errorText = 'That is not a valid entry.';
					}
					else {
						// start by clearing any old values
						$scope.coins.pence200 = 0;
						$scope.coins.pence100 = 0;
						$scope.coins.pence50 = 0;
						$scope.coins.pence2 = 0;
						$scope.coins.pence1 = 0;

						newNum = value.replace(pattern, '');
						roundedNum = Math.round(newNum * 100) / 100;

						if (value.match(/^£/) || value.match(/\./)) {
							// if the value starts with £ or includes a decimal point we need to multiply by 100 to get the pence
							// using parseInt to fix floating point issues (http://floating-point-gui.de/)
							$scope.totalPence = parseInt(roundedNum * 100);
							numCoins($scope.totalPence);

						}
						else {
							$scope.totalPence = roundedNum;
							numCoins($scope.totalPence);
						}

						$scope.errorText = '';
					}
				}

				function numCoins(pence) {
					// This works but it's a lot of code.
					// Let's find a better way.

					if (pence >= 200) {
						get200(pence);
					}
					else if (pence >= 100) {
						get100(pence);
					}
					else if (pence >= 50) {
						get50(pence);
					}
					else if (pence >= 2) {
						get2(pence);
					}
					else {
						get1(pence);
					}

					function get200(pence) {
						var remainder = pence % 200;
						$scope.coins.pence200 = Math.floor(pence/200);
						get100(remainder);
					}
					function get100(pence) {
						var remainder = pence % 100;
						$scope.coins.pence100 = Math.floor(pence/100);
						get50(remainder);
					}
					function get50(pence) {
						var remainder = pence % 50;
						$scope.coins.pence50 = Math.floor(pence/50);
						get2(remainder);
					}
					function get2(pence) {
						var remainder = pence % 2;
						$scope.coins.pence2 = Math.floor(pence/2);
						get1(remainder);
					}
					function get1(pence) {
						$scope.coins.pence1 = pence;
					}
				}
			}
		}
})();