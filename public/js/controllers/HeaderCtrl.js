angular.module('HeaderCtrl', []).controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', '$window', 'OffresService', 'AuthService'];

function HeaderController($scope, $window, OffresService, AuthService) {
    OffresService.getOffresCount().then(function(res){
        $scope.showOffres = res.data > 5;
    });

    $scope.logout = function() {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.nom;
        delete $window.sessionStorage.prenom;
        $window.location.reload(true);
    }

    $scope.logged = $window.sessionStorage.token;

}
