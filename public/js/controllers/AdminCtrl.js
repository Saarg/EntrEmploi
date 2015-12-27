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
})
// https://github.com/Mischi/angularjs-imageupload-directive
.directive('image', function($q) {
    'use strict'

    var URL = window.URL || window.webkitURL;

    var getResizeArea = function () {
        var resizeAreaId = 'fileupload-resize-area';

        var resizeArea = document.getElementById(resizeAreaId);

        if (!resizeArea) {
            resizeArea = document.createElement('canvas');
            resizeArea.id = resizeAreaId;
            resizeArea.style.visibility = 'hidden';
            document.body.appendChild(resizeArea);
        }

        return resizeArea;
    }

    var resizeImage = function (origImage, options) {
        var maxHeight = options.resizeMaxHeight || 300;
        var maxWidth = options.resizeMaxWidth || 250;
        var quality = options.resizeQuality || 0.7;
        var type = options.resizeType || 'image/jpeg';

        var canvas = getResizeArea();

        var height = origImage.height;
        var width = origImage.width;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width *= maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        //draw image on canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImage, 0, 0, width, height);

        // get the data from canvas as 70% jpg (or specified type).
        return canvas.toDataURL(type, quality);
    };

    var createImage = function(url, callback) {
        var image = new Image();
        image.onload = function() {
            callback(image);
        };
        image.src = url;
    };

    var fileToDataURL = function (file) {
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
    };

    return {
        restrict: 'A',
        scope: {
            image: '=',
            resizeMaxHeight: '@?',
            resizeMaxWidth: '@?',
            resizeQuality: '@?',
            resizeType: '@?',
        },
        link: function postLink(scope, element, attrs, ctrl) {

            var doResizing = function(imageResult, callback) {
                createImage(imageResult.url, function(image) {
                    var dataURL = resizeImage(image, scope);
                    imageResult.resized = {
                        dataURL: dataURL,
                        type: dataURL.match(/:(.+\/.+);/)[1],
                    };
                    callback(imageResult);
                });
            };

            var applyScope = function(imageResult) {
                scope.$apply(function() {
                    //console.log(imageResult);
                    if(attrs.multiple)
                        scope.image.push(imageResult);
                    else
                        scope.image = imageResult;
                });
            };

            element.bind('change', function (evt) {
                //when multiple always return an array of images
                if(attrs.multiple)
                    scope.image = [];

                var files = evt.target.files;
                for(var i = 0; i < files.length; i++) {
                    //create a result object for each file in files
                    var imageResult = {
                        file: files[i],
                        url: URL.createObjectURL(files[i])
                    };

                    fileToDataURL(files[i]).then(function (dataURL) {
                        imageResult.dataURL = dataURL;
                    });

                    if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                        doResizing(imageResult, function(imageResult) {
                            applyScope(imageResult);
                        });
                    }
                    else { //no resizing
                        applyScope(imageResult);
                    }
                }
            });
        }
    };
});

AdminController.$inject =['$scope', '$filter', 'AdminService', 'HomeService', 'OffresService', 'PartenairesService', 'StaffService', '$window', 'ngDialog'];

function AdminController($scope, $filter, AdminService, HomeService, OffresService, PartenairesService, StaffService, $window, ngDialog) {
    // ======  HOME  ======
    // GET
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

    // ADD
    $scope.newArticle = {};
    $scope.addArticle = function () {
        if(!$scope.newArticle.priority) {
            $scope.newArticle.priority = $scope.MainArticlesSorted[$scope.MainArticlesCount]+1;
        }
        HomeService.postArticle($scope.newArticle);
        $window.location.reload(true);
    }

    // EDIT
    $scope.currentArticle = {}
    $scope.editArticle = function (index) {
        $scope.currentArticle = $scope.MainArticles[index];
        //$scope.currentArticle.image = $scope.article.image
        HomeService.editArticle($scope.currentArticle);
        $window.location.reload(true);
    }
    $scope.infoArticle = function (index) {
        $scope.currentArticle = $scope.MainArticles[index];

        StaffService.getUser($scope.currentArticle._auteur).then(function(res){
            $scope.currentArticle.auteur  = res.data[0];
        });
        StaffService.getUser($scope.currentArticle._editeur).then(function(res){
            $scope.currentArticle.editeur  = res.data[0];
        });
        ngDialog.open({
            template : '../templates/infoArticle.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    // DELETE
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
