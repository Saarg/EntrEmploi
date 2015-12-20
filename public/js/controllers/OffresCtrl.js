angular.module('OffresCtrl', []).controller('OffresController', OffresController);

OffresController.$inject = ['$scope', 'Offre'];

function OffresController($scope, Offre) {

    $scope.offres = Offre.getOffres;

}
