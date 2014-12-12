var app  = angular.module('todos');

app.controller('TodosController', ['$scope','$routeParams','$location','Auth','Todos',
 function($scope,$routeParams,$location,Auth,Todos){
	$scope.authentication = Auth;

	$scope.create = function(){
		var todo = new Todos({
			titulo : this.titulo,
			descripcion : this.descripcion
		});

		todo.$save(function(response){
			alert("guado");
			$location.path('/todos/' + response._id);	
		}, function(errorResponse){
			alert("error");
			$scope.error = errorResponse.data.message;
		});
	};
	$scope.find = function(){
		$scope.todos = Todos.query();
	};
	$scope.findOne  = function(){
		
		$scope.todo = Todos.get({
			todoId : $routeParams.todoId
		});
	};
	$scope.update = function(){
		$scope.todos.$update(function(){
			$location.path('todos/' + response._id);	
			}, function(errorResponse){
				$scope.error = errorResponse.data.message;
		});
	};
	$scope.delete = function(todo){
		if (todo) {
			article.$remove(function(){
				for(var i in $scope.todos){
					if ($scope.todos[i]===todo){
						$scope.todos.splice(i,1);
					}
				}
			});
		}else {
			$scope.todo.$remove(function(){
				$location.path('todos');	
			})
		}
	}
}]);