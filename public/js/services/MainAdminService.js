angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);
