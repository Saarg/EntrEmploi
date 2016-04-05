angular.module('EntrEmploi').controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$window', 'OffresService', 'AuthService', 'ConfigService'];

function HeaderController($scope, $window, OffresService, AuthService, ConfigService) {
    // GET HEADER LOGO
    $scope.stockLogoSPF = "images/Logo-spf.png"
    ConfigService.getConfig("LogoSPF").then(function(res){
        $scope.logoSPF  = res.data;
    });
    $scope.stockLogoEntrEmploi = "images/Logo-entremploi-xl.png"
    ConfigService.getConfig("LogoEntrEmploi").then(function(res){
        $scope.logoEntrEmploi  = res.data;
    });

    // GET OFFRESCOUNT
    OffresService.getOffresCount().then(function(res){
        $scope.showOffres = res.data >= 3;
    });

    // AUTH
    if( AuthService.logged() )
        $scope.adminLoggedIn = true;
    else {
        AuthService.isLoggedIn().then(function (res) {
            $scope.loggedIn = res.data.loggedIn;
            if( $scope.loggedIn )
                $scope.entreprise = res.data.entreprise;
        });
    }

}
