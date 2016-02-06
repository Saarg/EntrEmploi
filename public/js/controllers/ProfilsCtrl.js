angular.module('EntrEmploi').controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope', '$window', 'ProfilsService'];

function ProfilsController($scope, $window, ProfilsService) {

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    $scope.openCV = function(id) {
        // TODO faire l'auth et check si le cv est upload
        $window.open("CV/"+id, '_blank');
    }
}
