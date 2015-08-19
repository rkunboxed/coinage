(function() {
	'use strict';

	angular
		.module('coinageApp')
		.controller('coinageController', coinageController);

	coinageController.$inject = ['$scope'];
	function coinageController($scope) {
		var vm = this;

		// set all the initial values to 0
		var coinsArr = [200, 100, 50, 2, 1], // value of the coins highest to lowest
			coinResults = { // where we will store the coin counts
				pence200: 0,
				pence100: 0,
				pence50: 0,
				pence2: 0,
				pence1: 0
			},
			totalPence,
			errorText ='';

		// make the values accessible to the template
		$scope.coinResults = coinResults;
		$scope.totalPence = totalPence;
		$scope.errorText = errorText;

		$scope.calculate = calculate;

		function calculate(value) {
			var newNum,
				roundedNum,
				pattern = /[^0-9.-]+/g; // get rid of the symbols

			if (!value) {
				$scope.errorText = 'That is not a valid entry.';
				return;
			}

			// right now we get the value from a text input so it's always a string
			// in the future, we might get the value from other types of inputs
			// so let's go ahead and make sure this is always a string
			value = value.toString();

			// @TODO £ can only start the string value.match(/^£/)
			// @TODO p can only end the string value.match(/p$/)
			// if (value.match(/^£|\.|\d/)) {
			// 	// starts w/valid character
			// }
			// if (value.match(/(p|\d|\.)$/)){
			// 	// ends w/valid character
			// }

			// check to make sure the value doesn't include any disallowed characters
			if (value.match(/[^£p.\d]/) || !value.match(/[\d]/)) {
				$scope.errorText = 'That is not a valid entry.';
			}

			else {
				// start by clearing any old values
				$scope.coinResults.pence200 = 0;
				$scope.coinResults.pence100 = 0;
				$scope.coinResults.pence50 = 0;
				$scope.coinResults.pence2 = 0;
				$scope.coinResults.pence1 = 0;

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
			for (var i = 0; i < coinsArr.length; i++) {
				var coinCount = Math.floor(pence / coinsArr[i]), // don't worry about the remainder
					coinName = 'pence' + coinsArr[i]; // create the result name

				$scope.coinResults[coinName] = coinCount;

				// reduce the current coin's amount from the total pence before proceeding
				pence -= coinCount * coinsArr[i];
			}
		}
	}

})();