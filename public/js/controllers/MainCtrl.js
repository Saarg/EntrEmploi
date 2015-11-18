angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 1000;
    $scope.interval = 5000;
    $scope.slides = [
    {
        text : "Super Equipe !"
    },
    {
        text : "Pas Mal du tout"
    },
    {
        text : "J'ai trouvé un boulot !"
    }
    ];

    $scope.images = [
    {
        link :"http://lorempixel.com/1300/400/business/"
    },
    {
        link :"http://lorempixel.com/1300/400/sports/"
    },
    {
        link :"http://lorempixel.com/1300/400/business/"
    },
    {
        link :"http://lorempixel.com/1300/400/business/"
    },
    {
        link :"http://lorempixel.com/1300/400/business/"
    },
    ];


});
