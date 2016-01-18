angular.module('HeaderCtrl', []).controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$window', 'OffresService', 'AuthService', 'ConfigService'];

function HeaderController($scope, $window, OffresService, AuthService, ConfigService) {
    // GET HEADER LOGO
    ConfigService.getConfig("LogoSPF").then(function(res){
        $scope.logoSPF  = res.data;
    });
    ConfigService.getConfig("LogoEntrEmploi").then(function(res){
        $scope.logoEntrEmploi  = res.data;
    });

    // GET OFFRESCOUNT
    OffresService.getOffresCount().then(function(res){
        $scope.showOffres = res.data >= 3;
    });

    // AUTH
    $scope.logged = $window.sessionStorage.token;

}
