angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les soffres
        getOffres : function() {
            return $http.get('/api/offres');
        },

        // these will work when more API routes are defined on the Node side of things
        // appel pour poster une offre
        create : function(Data) {
            return $http.post('/api/offres', Data);
        },

        // appel pour supprimer une offre
        delete : function(id) {
            return $http.delete('/api/offres/' + id);
        }
    }       
}]);

