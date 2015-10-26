angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
	createOffre : function(Data) {
            return $http.post('/api/offres', Data);
	}
    }
}]);
