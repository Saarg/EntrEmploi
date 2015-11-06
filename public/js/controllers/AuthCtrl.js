angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {

    $scope.submit = function () {
	Auth.loggin($scope).then(function(res){
	    $scope.success = res.data.success;
	    $scope.message = res.data.message;
	    
	    if(res.data.success) {
		$window.sessionStorage.token = res.data.token;
		$location.path("/admin/");
	    } else {
		// Erase the token if the user fails to log in
		delete $window.sessionStorage.token;
	    }
	});
    };
}]);
