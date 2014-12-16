'use strict';
angular.module('checks').config(['$routeProvider',
	function ($routeProvider) 
	{
		$routeProvider.
			when('/',{
				templateUrl : 'checks/views/index-checks.client.view.html'
			});
	}
]);