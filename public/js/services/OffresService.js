angular.module('OffresService', []).factory('OffresService', OffresService);

OffresService.$inject = ['$http'];

function OffresService($http) {
    return {
        // appel pour recup les offres
        getOffres : (function() {
            return $http.get('/api/offres');
        })().then(function (res) {
            return res.data;
        })
    }
}
