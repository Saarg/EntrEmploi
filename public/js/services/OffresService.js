angular.module('OffresService', []).factory('OffresService', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);
