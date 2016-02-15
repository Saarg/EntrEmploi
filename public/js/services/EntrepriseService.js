angular.module('EntrEmploi').factory('EntrepriseService', EntrepriseService);

EntrepriseService.$inject = ['$http', '$window'];

function EntrepriseService($http, $window) {
    return {
        getEntreprise : function(entreprise) {
            return $http.get('/api/entreprise/' + entreprise);
        },
        editEntreprise : function(entreprise) {
            return $http.put('/api/entreprise/' + entreprise._id, {
                mail: entreprise.mail,
                nom: entreprise.nom,
                tel: entreprise.tel,
                adresse: entreprise.adresse,
                compAdresse: entreprise.compAdresse,
                ville: entreprise.ville,
                codePostal: entreprise.codePostal
            });
        },
        logout : function() {
            return $http.get('/passwordless/logout');
        }
    };
}
