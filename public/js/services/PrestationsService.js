angular.module('EntrEmploi').factory('PrestationsService', PrestationsService);

PrestationsService.$inject = ['$http', '$window'];

function PrestationsService($http, $window) {
    return {
        // appel pour recup les prestations
        getPrestations : function() {
            return $http.get('/api/prestations');
        },
        // nouvelle prestation
        postPrestation : function (prestation) {
            return $http.post('/api/prestations', {
                token: $window.sessionStorage.token,
                titre : prestation.titre,
                description : prestation.description,
            });
        },

        editPrestation : function (prestation) {
            return $http.put('/api/prestations/' + prestation._id, {
                token: $window.sessionStorage.token,
                titre : prestation.titre,
                description : prestation.description
            });
        },

        inscrire : function (prestation) {
            return $http.put('/api/prestations/' + prestation._id +"/" + prestation.email, {
                token : $window.sessionStorage.token
            })
        },

        deletePrestation : function (prestation) {
            return $http.delete('/api/prestations/' + prestation._id + '?token=' + $window.sessionStorage.token);
        }
    }
}
