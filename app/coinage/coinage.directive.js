(function() {
	'use strict';

	angular
		.module('coinageApp')
		.directive('coinageCalc', coinageCalc);

		function coinageCalc() {
			var directive = {
				restrict: 'E',
				templateUrl: 'app/coinage/coinage.html',
				scope: {},
				controller: 'coinageController',
				controllerAs: 'vm'
			}

			return directive;
		}
})();