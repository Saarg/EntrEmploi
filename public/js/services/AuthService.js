angular.module('AuthService', []).factory('Auth', ['$http', '$window', function($http, $window) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	}
    }
}]);
