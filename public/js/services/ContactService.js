angular.module('ContactService', []).factory('Contact', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);
