angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);
