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
                $window.sessionStorage.user_id = res.data.user._id;
                $window.sessionStorage.nom = res.data.user.nom;
                $window.sessionStorage.prenom = res.data.user.prenom;
                $window.sessionStorage.accesLevel = res.data.user.accesLevel;
                $window.location.href = "/admin";
            } else {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user_id
                delete $window.sessionStorage.nom;
                delete $window.sessionStorage.prenom;
                delete $window.sessionStorage.accesLevel;
            }
        });
    };
}
