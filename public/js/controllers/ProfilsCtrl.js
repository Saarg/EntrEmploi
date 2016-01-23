angular.module('ProfilsCtrl', []).controller('ProfilsController', ProfilsController);

ProfilsController.$inject = ['$scope'];

function ProfilsController($scope) {

    $scope.tagline = 'Tu es un Recruteur?';

}
