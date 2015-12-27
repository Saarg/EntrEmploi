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
        postArticle : function(newArticle) {
            if(newArticle.media == 'Photo')
                newArticle.lienMedia = newArticle.image.resized.dataURL;
            else if (newArticle.media == 'Vidéo') {
                newArticle.lienMedia = newArticle.lienMedia.replace("watch?v=", "embed/");
            }
            return $http.post('/api/mainArticles', { token: $window.sessionStorage.token,
                titre: newArticle.titre,
                contenu: newArticle.contenu.replace(/\n/g, "<"+"br/>"),
                priority: newArticle.priority,
                media: newArticle.media,
                lienMedia: newArticle.lienMedia
            });
        },
        editArticle : function(article) {
            if(article.media == 'Photo')
                article.lienMedia = article.image.resized.dataURL;
            else if (article.media == 'Vidéo') {
                article.lienMedia = article.lienMedia.replace("watch?v=", "embed/");
            }
            return $http.put('/api/mainArticles/' + article._id, {
                token: $window.sessionStorage.token,
                titre: article.titre,
                contenu: article.contenu.replace(/\n/g, "<"+"br/>"),
                media: article.media,
                lienMedia: article.lienMedia,
                priority: article.priority
            });
        },
        deleteArticle : function(article_id) {
            return $http.delete( '/api/mainArticles/' + article_id +'?token='+ $window.sessionStorage.token);
        }
    }
}
