angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', 'MainArticle', '$window', function($scope, Admin, MainArticle, $window) {

    MainArticle.getArticleCount().then(function(res){
        $scope.MainArticlesCount  = res.data;
    });
    MainArticle.getArticles().then(function(res){
        $scope.MainArticles  = res.data;
    });

    $scope.newArticle = {};
    $scope.addArticle = function () {
        $scope.newArticle.priority = $scope.MainArticlesCount+1;
        Admin.postArticle($scope);
	};

    $scope.oldArticle = {};
    $scope.deleteArticle = function (article_id) {
        Admin.deleteArticle(article_id);
	};

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
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
