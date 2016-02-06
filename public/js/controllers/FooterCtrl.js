angular.module('EntrEmploi').controller('FooterController', FooterController);

FooterController.$inject = ['$scope', '$filter', 'HomeService', 'PartenairesService', 'ConfigService'];

function FooterController($scope, $filter, HomeService, PartenairesService, ConfigService) {

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = $filter('orderBy')(res.data, 'priority');
    });

    PartenairesService.getPartenaires().then(function (res) {
        $scope.Partenaires = res.data;
    });

    $scope.addr = [];
    ConfigService.getConfig("addr1").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr2").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr3").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr4").then(function(res){
        $scope.addr.push(res.data);
    });

}
