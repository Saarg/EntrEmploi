angular.module('OffresService', []).factory('OffresService', OffresService);

OffresService.$inject = ['$http', '$window'];

function OffresService($http, $window) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        getOffresCount : function() {
            return $http.get('/api/offres/count');
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
        },

        editOffre : function (offre) {
            return $http.put('/api/offres/' + offre._id, {
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
        },

        deleteOffre : function (offre) {
            return $http.delete('/api/offres/' + offre._id + '?token=' + $window.sessionStorage.token);
        }
    }
}
