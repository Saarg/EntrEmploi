angular.module('OffresCtrl', []).controller('OffresController', ['$scope', 'Offre', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;
    });

}]);
