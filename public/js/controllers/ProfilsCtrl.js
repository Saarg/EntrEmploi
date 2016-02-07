angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$window', 'ProfilsService', 'ngDialog', 'ProfilsService'];

function ProfilsController($scope, $window, ProfilsService, ngDialog, ProfilsService) {

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    $scope.entreprise = {};
    $scope.loginEntreprise = function() {
        ProfilsService.loginEntreprise($scope.entreprise).then(function (res) {
            console.log(res.data);
        });
    }

    $scope.openCV = function(id) {
        $window.open("CV/"+id, '_blank');
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
