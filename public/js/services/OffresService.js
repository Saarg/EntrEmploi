angular.module('OffresService', []).factory('Offres', ['$http', function($http) {
    return {
        // appel pour recup les soffres
        get : function() {
            return $http.get('/api/offres');
        },

        // these will work when more API routes are defined on the Node side of things
        // appel pour poster une offre
        create : function(nerdData) {
            return $http.post('/api/offres', offreData);
        },

        // appel pour supprimer une offre
        delete : function(id) {
            return $http.delete('/api/offres/' + id);
        }
    }       
}]);

