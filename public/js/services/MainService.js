angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);
