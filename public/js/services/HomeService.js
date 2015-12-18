angular.module('HomeService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        },
        getArticleCount : function() {
            return $http.get('/api/mainArticles/count');
        }
    }
}]);
