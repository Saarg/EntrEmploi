angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$log', '$filter', '$window', 'ProfilsService', 'ngDialog', 'AuthService'];

function ProfilsController($scope, $log, $filter, $window, ProfilsService, ngDialog, AuthService) {

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
        if($scope.loggedIn)
            return 1;

        $scope.entreprise.sent = true;
        AuthService.loginEntreprise($scope.entreprise).then(function (res) {
            $log.log(res.data);
        });
    }

    $scope.resetMail = function() {
        $scope.entreprise.email = "";
        $scope.entreprise.sent  = false;
    }

    $scope.openCV = function(id) {
        if( $scope.loggedIn ) {
            $log.log($scope.entreprise);
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
    $scope.filtre = {ville:0, villeList: ["All"], job:0, jobList: ["All"]};
    $scope.showProfil = function(profil) {
        // On ignore tous les profils sans CV
        if(!profil.cv)
            return false;
        // On en profite pour lister les villes et jobs
        if($scope.filtre.villeList.indexOf(profil.ville.toLowerCase()) == -1)
            $scope.filtre.villeList.push(profil.ville.toLowerCase());
        if($scope.filtre.jobList.indexOf(profil.job.toLowerCase()) == -1)
            $scope.filtre.jobList.push(profil.job.toLowerCase());
        // On applique le filtre
        if ($scope.filtre.ville != 0 && $scope.filtre.villeList[$scope.filtre.ville].toLowerCase() != profil.ville.toLowerCase())
            return false;
        else if ($scope.filtre.job != 0 && $scope.filtre.jobList[$scope.filtre.job].toLowerCase() != profil.job.toLowerCase())
            return false;
        else
            return true;
    }

}
