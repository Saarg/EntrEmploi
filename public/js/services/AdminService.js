angular.module('AdminService', []).factory('AdminService', AdminService);

AdminService.$inject = ['$http', '$window', '$location'];

function AdminService($http, $window) {
    return {
        postArticle : function($scope) {
            return $http.post('/api/mainArticles', { token: $window.sessionStorage.token,
                titre: $scope.newArticle.titre,
                contenu: $scope.newArticle.contenu,
                priority: $scope.newArticle.priority
            });
        },
        editArticle : function($scope, index) {
            return $http.put('/api/mainArticles/' + $scope.MainArticles[index]._id, { token: $window.sessionStorage.token,
                titre: $scope.MainArticles[index].titre,
                contenu: $scope.MainArticles[index].contenu,
                priority: $scope.MainArticles[index].priority
            });
        },
        deleteArticle : function(article_id) {
            return $http.delete( '/api/mainArticles/' + article_id +'?token='+ $window.sessionStorage.token);
        }
    }
}
