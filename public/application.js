var mainApplicationModuleName ='TC';

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngRoute','ngResource','users','todos']);
mainApplicationModule.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);
angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
}); 