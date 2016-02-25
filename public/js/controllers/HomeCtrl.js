angular.module('EntrEmploi').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$filter', "$sce", 'HomeService'];

function HomeController($scope, $filter, $sce, HomeService) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
        { text : "Super Equipe !" },
        { text : "Pas Mal du tout" },
        { text : "J'ai trouvé un boulot !" }
    ];

    $scope.images = [
        { link :"http://lorempixel.com/1300/400/business/" },
        { link :"http://lorempixel.com/1300/400/business/" },
        { link :"http://lorempixel.com/1300/400/business/" },
        { link :"http://lorempixel.com/1300/400/business/" },
        { link :"http://lorempixel.com/1300/400/business/" }
    ];

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = $filter('orderBy')(res.data, 'priority');
        for(var i in $scope.MainArticles){
            $scope.MainArticles[i].Stitre = $scope.MainArticles[i].titre.split(" ", 2);
            $scope.MainArticles[i].lienMedia = $sce.trustAsResourceUrl($scope.MainArticles[i].lienMedia);
        }
    });

    $scope.succes = 10;
}
