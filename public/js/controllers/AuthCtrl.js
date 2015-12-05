angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', function($scope, Auth, $window) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    //$location.path("/admin/");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);
