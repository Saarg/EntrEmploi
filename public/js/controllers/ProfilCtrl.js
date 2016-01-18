angular.module('ProfilCtrl', []).controller('ProfilController', ProfilController);

ProfilController.$inject = ['$scope', '$window', 'StaffService'];

function ProfilController($scope, $window, StaffService) {

    StaffService.getUser($window.sessionStorage.user_id).then(function (res) {
        $scope.user = res.data[0];
        console.log(res.data[0]);
    });

    $scope.logout = function() {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.nom;
        delete $window.sessionStorage.prenom;
        $window.location.reload(true);
    }

    $scope.editUser = function () {
        StaffService.editUser($scope.user);
    }

}
