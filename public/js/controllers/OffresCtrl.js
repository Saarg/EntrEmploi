angular.module('OffresCtrl', []).controller('OffresController', ['$scope', 'Offre', function($scope, Offre) {

    $scope.offres = Offre.getOffres;

}]);
