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
        template:
        '<div class="tabbable">' +
        '<ul class="nav nav-tabs">' +
        '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
        '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
        '</li>' +
        '</ul>' +
        '<div class="tab-content" ng-transclude></div>' +
        '</div>',
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
        template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
        replace: true
    };
});

AdminController.$inject =['$scope', '$filter', 'AdminService', 'HomeService', 'OffresService', '$window', 'ngDialog'];

function AdminController($scope, $filter, AdminService, HomeService, OffresService, $window, ngDialog) {

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
        AdminService.postArticle($scope);
        $window.location.reload(true);
    }

    $scope.oldArticle = {};
    $scope.editArticle = function (index) {
        AdminService.editArticle($scope, index);
        $window.location.reload(true);
    }
    $scope.deleteArticle = function (article_id) {
        AdminService.deleteArticle(article_id);
        $window.location.reload(true);
    }

    $scope.ArticleTracker = function(article) {
        return article.priority + article._id;
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
}
