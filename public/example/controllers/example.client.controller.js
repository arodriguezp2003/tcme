var app = angular.module('example');

app.controller('ExampleController',['$scope', 'Auth',function($scope,Auth){
	$scope.name =Auth.user ? Auth.user.username : "Hi MTF"
}]);