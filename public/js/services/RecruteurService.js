angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);
