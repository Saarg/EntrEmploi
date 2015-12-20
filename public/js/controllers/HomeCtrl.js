angular.module('HomeCtrl', ['ui.bootstrap', 'ngAnimate']).controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'HomeService'];

function HomeController($scope, HomeService) {
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
        $scope.MainArticles  = res.data;
    });

    $scope.succes = 10;
}
