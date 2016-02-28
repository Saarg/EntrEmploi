angular.module('EntrEmploi').controller('ProfilController', ProfilController);

ProfilController.$inject = ['$scope', '$log', '$window', 'StaffService'];

function ProfilController($scope, $log, $window, StaffService) {

    StaffService.getUser($window.localStorage.user_id).then(function (res) {
        $scope.user = res.data[0];
        $log.log(res.data[0]);
    });

    $scope.logout = function() {
        delete $window.localStorage.token;
        delete $window.localStorage.nom;
        delete $window.localStorage.prenom;
        $window.location.reload(true);
    }

    $scope.editUser = function () {
        StaffService.editUser($scope.user).then(function (res) {
            $log.log(res.data.success);
            if(res.data.success){
                delete $scope.EPalert;
                $scope.EPsuccess = "Votre profil a bien été modifié";
            } else {
                delete $scope.EPsuccess;
                $scope.EPalert = res.data.message;
            }
        });
    }

    $scope.changePasswd = function () {
        if($scope.user.newPasswd == $scope.user.confPasswd && $scope.user.newPasswd) {
            StaffService.editUser($scope.user);
            delete $scope.CPalert;
            $scope.CPsuccess = "mot de passe changé avec succes";
        } else if($scope.user.newPasswd) {
            delete $scope.CPsuccess;
            $scope.CPalert = "les mots de passe ne correspondent pas";
        }

    }

}
