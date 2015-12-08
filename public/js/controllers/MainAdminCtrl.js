angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);
