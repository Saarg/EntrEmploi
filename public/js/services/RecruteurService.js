angular.module('RecruteurService', []).factory('RecruteurService', RecruteurService);

RecruteurService.$inject = ['$http'];

function RecruteurService($http) {
    return {
        getprofils : function() {
            return $http.get('/api/profils');
        }
    }
}
