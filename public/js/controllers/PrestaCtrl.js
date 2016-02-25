angular.module('EntrEmploi').controller('PrestationsController', PrestaController);

PrestaController.$inject = ['$scope', 'PrestationsService'];

function PrestaController ($scope, PrestationsService) {

    PrestationsService.getPrestations().then(function (res) {
        $scope.prestations = res.data;
        console.log(res);
    })
}
