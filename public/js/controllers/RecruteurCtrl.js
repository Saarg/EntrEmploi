angular.module('RecruteurCtrl', []).controller('RecruteurController', RecruteurController);

RecruteurController.$inject = ['$scope'];

function RecruteurController($scope) {

    $scope.tagline = 'Tu es un Recruteur?';

}
