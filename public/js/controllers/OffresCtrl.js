angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {
    
    //$scope.tagline = 'Offres!';
    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});
