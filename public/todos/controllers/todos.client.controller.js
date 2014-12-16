var app  = angular.module('todos');

app.controller('TodosController', 
	['$scope','$routeParams','$location','$interval','$moment','Auth','Todos','Checks',
 function($scope,$routeParams,$location,$interval, $moment,Auth,Todos,Checks){
 
	$scope.authentication = Auth;
	$scope.authentication.valid();
    $scope.time = "00:00:00";

	$interval(function() {
        angular.forEach($scope.checks,function(f,i){
		 		$scope.time = f.creado;
		 		var then  = $moment($scope.time);
			 	var now =  $moment();
			 	

				var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
				var d = moment.duration(ms);
				var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
		 		$scope.time = s;
		 		return;
	 		});
    }, 1000);

	//CRUD
 	$scope.create = function( ){
		var todo = new Todos({
			titulo : this.titulo,
			descripcion : this.descripcion
		});

		todo.$save(function(response){
			$location.path('/todos/' + response._id);	
		}, function(errorResponse){
		
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
		
		$scope.checks =  Checks.query();
		//console.log($scope.checks);
		
	};
	$scope.update = function(){
		$scope.todo.$update(function(){
			$location.path('todos/' + $scope.todo._id);	
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