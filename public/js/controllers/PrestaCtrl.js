angular.module('EntrEmploi').controller('PrestationsController', PrestaController);

PrestaController.$inject = ['$scope', 'PrestationsService', 'ngDialog'];

function PrestaController ($scope, PrestationsService, ngDialog) {

    PrestationsService.getPrestations().then(function (res) {
        $scope.prestations = res.data;
    });

    $scope.inscrirePrestation = function (prestation) {
        ngDialog.open({
            template : '../templates/inscriptionPrestation.html',
            className : 'ngdialog-theme-default',
            disableAnimation : true,
            scope: prestation
        })
    }

    $scope.submit = function (prestation) {
        PrestationsService.inscrire(prestation).then(function () {
            prestation.email = "";
        });
    }
}
