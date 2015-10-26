angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);
