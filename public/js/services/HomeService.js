angular.module('HomeService', []).factory('HomeService', HomeService);

HomeService.$inject = ['$http'];

function HomeService($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        },
        getArticleCount : function() {
            return $http.get('/api/mainArticles/count');
        }
    }
}
