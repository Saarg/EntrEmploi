angular.module('OffresService', []).factory('OffresService', OffresService);

OffresService.$inject = ['$http', '$window'];

function OffresService($http, $window) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            (function() {
                return $http.get('/api/offres');
            })().then(function (res) {
                return res.data;
            })
        },
        // nouvelle offre
        postOffre : function (offre) {
            return $http.post('/api/offres', {
                token: $window.sessionStorage.token,
                titre : offre.titre,
                contenu : offre.contenu,
                entreprise : offre.entreprise,
                siteEntreprise : offre.siteEntreprise,
                numContact : offre.numContact,
                mailContact : offre.mailContact,
                categ : offre.categ,
                location : offre.location,
                contract : offre.contract,
                date : Date()
            });
        }
    }
}
