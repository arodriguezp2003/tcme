'user strict';

angular.module('checks').factory('Checks', ['$resource', function($resource){
	return $resource('api/checks/:checkId',{
		todoId: '@_id'
	},{
		update: {
			method: 'PUT'
		}
	});	
}])