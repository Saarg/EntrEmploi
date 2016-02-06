angular.module('EntrEmploi').factory('PartenairesService', PartenairesService);

PartenairesService.$inject = ['$http', '$window'];

function PartenairesService($http, $window) {
    return {
        getPartenaires : function() {
            return $http.get('/api/partenaires');
        },
        postPartenaire : function (partenaire) {
            return $http.post('/api/partenaires', {
                token: $window.sessionStorage.token,
                nom : partenaire.nom,
                site : partenaire.site
            });
        },
        editPartenaire : function(partenaire) {
            return $http.put('/api/partenaires/' + partenaire._id, {
                token: $window.sessionStorage.token,
                nom: partenaire.nom,
                site: partenaire.site
            });
        },
        deletePartenaire : function(partenaire_id) {
            return $http.delete( '/api/partenaires/' + partenaire_id +'?token='+ $window.sessionStorage.token);
        }
    }
}
