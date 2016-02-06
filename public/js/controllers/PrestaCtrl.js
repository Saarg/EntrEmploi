angular.module('EntrEmploi').controller('PrestationsController', PrestaController);

PrestaController.$inject = ['$scope'];

function PrestaController ($scope) {
    PrestationsService.getPrestations().then(function (res) {
        $scope.prestations = res;
        console.log(res);
    })
}
