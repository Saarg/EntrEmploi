angular.module('OffresCtrl', []).controller('OffresController', ['$scope', 'OffresService', function($scope, OffresService) {

    OffresService.getOffres().then(function(res){
        $scope.offres = res.data;
    });

}]);
