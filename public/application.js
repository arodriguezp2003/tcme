var mainApplicationModuleName ='TC';

var mainApplicationModule = angular.module(mainApplicationModuleName,
	['ngRoute','ngResource','angular-momentjs','users','todos','checks']);
mainApplicationModule.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);
angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
}); 

  mainApplicationModule.config(function($momentProvider){
    $momentProvider
      .asyncLoading(false)
      .scriptUrl('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
  });
mainApplicationModule.directive('todosList',function(){
	return {
		restrict: 'E',
		templateUrl: 'directivas/todos-list.html'
	}
});