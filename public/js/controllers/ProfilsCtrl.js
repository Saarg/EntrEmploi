angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$window', 'ProfilsService', 'ngDialog', 'ProfilsService', 'AuthService'];

function ProfilsController($scope, $window, ProfilsService, ngDialog, ProfilsService, AuthService) {

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    AuthService.isLoggedIn().then(function (res) {
        $scope.loggedIn = res.data.loggedIn;
        if( $scope.loggedIn )
            $scope.entreprise = res.data.entreprise;
    });

    $scope.entreprise = {};
    $scope.loginEntreprise = function() {
        AuthService.loginEntreprise($scope.entreprise).then(function (res) {
            console.log(res.data);
        });
    }

    $scope.openCV = function(id) {
        if( $scope.loggedIn )
            $window.open("CV/"+id, '_blank');
        else
            $scope.popupLogiEntreprise();
    }
    $scope.popupLogiEntreprise = function() {
        ngDialog.open({
            template : '../templates/loginEntreprise.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
}
