angular.module('EntrEmploi').controller('ProfilController', ProfilController);

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
        StaffService.editUser($scope.user).then(function (res) {
            console.log(res.data.success);
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
