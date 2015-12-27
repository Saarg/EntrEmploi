angular.module('AuthCtrl', []).controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'AuthService', '$window', '$location'];

function AuthController($scope, AuthService, $window, $location) {
    if ($window.sessionStorage.nom) {
        $location.path("/admin");
    }

    $scope.submit = function () {
        AuthService.loggin($scope).then(function(res){
            $scope.success = res.data.success;
            $scope.message = res.data.message;

            if(res.data.success) {
                $window.sessionStorage.token = res.data.token;
                $window.sessionStorage.nom = res.data.nom;
                $window.sessionStorage.prenom = res.data.prenom;
                $window.sessionStorage.accesLevel = res.data.accesLevel;
                $window.location.href = "/admin";
            } else {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.nom;
                delete $window.sessionStorage.prenom;
                delete $window.sessionStorage.accesLevel;
            }
        });
    };
}
