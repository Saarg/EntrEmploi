angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
        postArticle : function($scope) {
    	    return $http.post('/api/mainArticles', { token: $window.sessionStorage.token,
                titre: $scope.newArticle.titre,
                contenu: $scope.newArticle.contenu,
                priority: $scope.newArticle.priority
            });
    	},
        deleteArticle : function(article_id) {
            return $http.delete( '/api/mainArticles/' + article_id +'?token='+ $window.sessionStorage.token);
        }
    }
}]);
