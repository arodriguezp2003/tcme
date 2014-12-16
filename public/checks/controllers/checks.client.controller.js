var app =  angular.module('checks');

app.controller('ChecksController', 
	['$scope','$routeParams','$location','Auth','Checks','Todos',
	function($scope,$routeParams,$location,Auth,Checks,Todos){
		$scope.authentication = Auth;
		$scope.todos  = Todos.query();
		$scope.checks = Checks.query();

		$scope.check = function()
		{
			var check = new Checks({
				todo : $scope.todo._id,
				checkin: true,
			});
			check.$save(function(response){
				$location.path('/todos/' + response.todo);	
			}, function(errorResponse){
			
				$scope.error = errorResponse.data.message;
			});
		}

	}
]);
