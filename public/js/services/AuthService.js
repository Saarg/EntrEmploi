angular.module('AuthService', []).factory('Auth', ['$http', function($http) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);
