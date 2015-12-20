angular.module('OffresCtrl', []).controller('OffresController', OffresController);

OffresController.$inject = ['$scope', 'OffresService'];

function OffresController($scope, OffresService) {

    $scope.offres = OffresService.getOffres;

}
