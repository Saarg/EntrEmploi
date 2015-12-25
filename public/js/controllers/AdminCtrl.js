angular.module('AdminCtrl', ['ngDialog']).controller('AdminController', AdminController)

.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
                if (panes.length == 0) $scope.select(pane);
                panes.push(pane);
            }
        },
        templateUrl: '../templates/tabs.html',
        replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        templateUrl: '../templates/pane.html',
        replace: true
    };
});

AdminController.$inject =['$scope', '$filter', 'AdminService', 'HomeService', 'OffresService', 'PartenairesService', '$window', 'ngDialog'];

function AdminController($scope, $filter, AdminService, HomeService, OffresService, PartenairesService, $window, ngDialog) {
    // HOME
    HomeService.getArticleCount().then(function(res){
        $scope.MainArticlesCount  = res.data;
    });

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = res.data;
        for(var i in $scope.MainArticles){
            $scope.MainArticles[i].contenu = $scope.MainArticles[i].contenu.replace(/<br\s*[\/]?>/gi, "\n");
        }
        $scope.MainArticlesSorted  = $filter('orderBy')($scope.MainArticles, 'priority');
    });

    

    $scope.newArticle = {};
    $scope.addArticle = function () {
        $scope.newArticle.priority = $scope.MainArticlesCount+1;
        HomeService.postArticle($scope);
        $window.location.reload(true);
    }

    $scope.oldArticle = {};
    $scope.editArticle = function (index) {
        HomeService.editArticle($scope, index);
        $window.location.reload(true);
    }
    $scope.deleteArticle = function (article_id) {
        HomeService.deleteArticle(article_id);
        $window.location.reload(true);
    }

    $scope.ArticleTracker = function(article) {
        return article.priority + article.titre;
    }
    $scope.reload = function() {
        $window.location.reload(true);
    }

    OffresService.getOffres().then(function (res) {
        $scope.offres = res.data;
    });

    $scope.addOffre = function (newOffre) {
        OffresService.postOffre(newOffre);
    }

    $scope.curOffreIndex = 0;
    $scope.activateOffre = function(index) {
        $scope.curOffreIndex = index;
    }

    $scope.newOffre = {};
    $scope.newOffrePopup = function () {
        ngDialog.open({
            template : '../templates/newOffre.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    // PARTENAIRES
    PartenairesService.getPartenaires().then(function (res) {
        $scope.Partenaires = res.data;
    });

    $scope.newPartenaire = {};
    $scope.addPartenaire = function (newPartenaire) {
        PartenairesService.postPartenaire(newPartenaire);
        $window.location.reload(true);
    }
    $scope.editPartenaire = function (partenaire) {
        PartenairesService.editPartenaire(partenaire);
        $window.location.reload(true);
    }
    $scope.deletePartenaire = function (partenaire_id) {
        PartenairesService.deletePartenaire(partenaire_id);
        $window.location.reload(true);
    }

    $scope.PartenairePopup = function () {
        ngDialog.open({
            template : '../templates/newPartenaire.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
}
