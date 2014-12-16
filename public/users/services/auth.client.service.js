angular.module('users').factory('Auth', [ function(){
	
	this.user = window.user;


	
		return {
			user: this.user,
			valid : function() {
				if (!this.user) {
					$location.path('/');
				}
			}
	}
}])