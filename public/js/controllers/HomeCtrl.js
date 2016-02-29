angular.module('EntrEmploi').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$filter', "$sce", 'HomeService', 'ConfigService'];

function HomeController($scope, $filter, $sce, HomeService, ConfigService) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;

    ConfigService.getConfigAll("carousel").then(function(res) {
        $scope.images = res.data;
    });

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = $filter('orderBy')(res.data, 'priority');
        for(var i in $scope.MainArticles){
            $scope.MainArticles[i].Stitre = $scope.MainArticles[i].titre.split(" ", 2);
            $scope.MainArticles[i].lienMedia = $sce.trustAsResourceUrl($scope.MainArticles[i].lienMedia);
        }
    });
}
