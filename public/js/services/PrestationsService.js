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
                token: $window.localStorage.token,
                titre : prestation.titre,
                description : prestation.description,
                messageConfirmation : prestation.messageConfirmation,
                maxInscrits : prestation.maxInscrits
            });
        },

        editPrestation : function (prestation) {
            return $http.put('/api/prestations/' + prestation._id, {
                token: $window.localStorage.token,
                titre : prestation.titre,
                description : prestation.description,
                messageConfirmation : prestation.messageConfirmation,
                maxInscrits : prestation.maxInscrits
            });
        },

        inscrirePrestation : function (prestation, email) {
            return $http.put('/api/prestations/' + prestation._id + '/' + email);
        },

        deletePrestation : function (prestation) {
            return $http.delete('/api/prestations/' + prestation._id + '?token=' + $window.localStorage.token);
        }
    }
}
