angular.module('EntrEmploi').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'AuthService', '$window', '$location'];

function AuthController($scope, AuthService, $window, $location) {
    if ($window.localStorage.nom) {
        $location.path("/admin");
    }

    $scope.submit = function () {
        AuthService.loggin($scope).then(function(res){
            $scope.success = res.data.success;
            $scope.message = res.data.message;

            if(res.data.success) {
                $window.localStorage.token = res.data.token;
                $window.localStorage.user_id = res.data.user._id;
                $window.localStorage.nom = res.data.user.nom;
                $window.localStorage.prenom = res.data.user.prenom;
                $window.localStorage.accesLevel = res.data.user.accesLevel;

                $window.location.href = "/admin";
            } else {
                delete $window.localStorage.token;
                delete $window.localStorage.user_id
                delete $window.localStorage.nom;
                delete $window.localStorage.prenom;
                delete $window.localStorage.accesLevel;
            }
        });
    };
}
