angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$window', 'ProfilsService', 'ngDialog'];

function ProfilsController($scope, $window, ProfilsService, ngDialog) {

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    $scope.loginEntreprise = function() {
        console.log("TODO implementer passwordless");
    }

    $scope.openCV = function(id) {
        if($window.sessionStorage.token) {
            $window.open("CV/"+id, '_blank');
        } else {
            ngDialog.open({
                template : '../templates/loginEntreprise.html',
                className: 'ngdialog-theme-default',
                disableAnimation : true,
                scope: $scope
            });
        }
    }
}
