angular.module('EntrEmploi').controller('OffresController', OffresController);

OffresController.$inject = ['$scope', 'OffresService'];

function OffresController($scope, OffresService) {

    OffresService.getOffres().then(function (res) {
        $scope.offres = res.data;
    });

}
