angular.module('FooterCtrl', []).controller('FooterController', FooterController);

FooterController.$inject = ['$scope', '$filter', 'HomeService', 'PartenairesService'];

function FooterController($scope, $filter, HomeService, PartenairesService) {

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = $filter('orderBy')(res.data, 'priority');
    });

    PartenairesService.getPartenaires().then(function (res) {
        $scope.Partenaires = res.data;
    });

}
