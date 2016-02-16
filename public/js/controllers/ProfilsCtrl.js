angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$filter', '$window', 'ProfilsService', 'ngDialog', 'ProfilsService', 'AuthService'];

function ProfilsController($scope, $filter, $window, ProfilsService, ngDialog, ProfilsService, AuthService) {

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    AuthService.isLoggedIn().then(function (res) {
        $scope.loggedIn = res.data.loggedIn;
        if( $scope.loggedIn )
            $scope.entreprise = res.data.entreprise;
    });

    // Fonctions de login

    $scope.entreprise = {};
    $scope.loginEntreprise = function() {
        $scope.entreprise.sent = true;
        AuthService.loginEntreprise($scope.entreprise).then(function (res) {
            console.log(res.data);
        });
    }

    $scope.resetMail = function() {
        $scope.entreprise.email = "";
        $scope.entreprise.sent  = false;
    }

    $scope.openCV = function(id) {
        if( $scope.loggedIn ) {
            console.log($scope.entreprise);
            $window.open("CV/"+id, '_blank');
        } else {
            $scope.popupLogiEntreprise();
        }
    }
    $scope.popupLogiEntreprise = function() {
        ngDialog.open({
            template : '../templates/loginEntreprise.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    // Filtres de recherche
    $scope.filtre = {ville:0, villeList: ["All", "Brest", "Qimper"], job:0, jobList: ["All", "Comerce", "Marketing"]};
    $scope.showProfil = function(profil) {
        if(!profil.cv)
            return false;
        else if ($scope.filtre.ville != 0 && $scope.filtre.villeList[$scope.filtre.ville] != profil.ville)
            return false;
        else if ($scope.filtre.job != 0 && $scope.filtre.jobList[$scope.filtre.job] != profil.job)
            return false;
        else
            return true;
    }

}
