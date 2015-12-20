angular.module('StaffService', []).factory('StaffService', StaffService);

StaffService.$inject = ['$http'];

function StaffService($http) {
    return {
        // gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
        // gestion des profils
        getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
        // gestion des articles de la mainpage
        getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    };
}
