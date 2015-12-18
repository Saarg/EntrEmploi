angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});
