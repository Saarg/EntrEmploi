angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);
