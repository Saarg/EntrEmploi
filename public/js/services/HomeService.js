angular.module('HomeService', []).factory('HomeService', HomeService);

HomeService.$inject = ['$http', '$window'];

function HomeService($http, $window) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        },
        getArticleCount : function() {
            return $http.get('/api/mainArticles/count');
        },
        postArticle : function($scope) {
            return $http.post('/api/mainArticles', { token: $window.sessionStorage.token,
                titre: $scope.newArticle.titre,
                contenu: $scope.newArticle.contenu.replace(/\n/g, "<"+"br/>"),
                priority: $scope.newArticle.priority,
                media: $scope.newArticle.media,
                lienMedia: $scope.newArticle.lienMedia
            });
        },
        editArticle : function($scope, index) {
            return $http.put('/api/mainArticles/' + $scope.MainArticles[index]._id, {
                token: $window.sessionStorage.token,
                titre: $scope.MainArticles[index].titre,
                contenu: $scope.MainArticles[index].contenu.replace(/\n/g, "<"+"br/>"),
                media: $scope.MainArticles[index].media,
                lienMedia: $scope.MainArticles[index].lienMedia,
                priority: $scope.MainArticles[index].priority
            });
        },
        deleteArticle : function(article_id) {
            return $http.delete( '/api/mainArticles/' + article_id +'?token='+ $window.sessionStorage.token);
        }
    }
}
