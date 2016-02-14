angular.module('EntrEmploi').controller('EntrepriseController', EntrepriseController);

EntrepriseController.$inject = ['$scope', '$window', 'EntrepriseService', 'AuthService'];

function EntrepriseController($scope, $window, EntrepriseService, AuthService) {

    AuthService.isLoggedIn().then(function (res) {
        $scope.loggedIn = res.data.loggedIn;
        if( $scope.loggedIn )
            EntrepriseService.getEntreprise(res.data.entreprise).then(function (res) {
                console.log(res.data);
                $scope.entreprise = res.data;
            });
        else
            $window.location = "/";
    });

    $scope.logout = function() {
        EntrepriseService.logout();
        $window.location = "/";
    }

    $scope.editEntreprise = function () {
        EntrepriseService.editEntreprise($scope.entreprise).then(function (res) {
            console.log(res.data.success);
            if(res.data.success){
                delete $scope.EEalert;
                $scope.EEsuccess = "Votre profil a bien été modifié";
            } else {
                delete $scope.EEsuccess;
                $scope.EEalert = res.data.message;
            }
        });
    }
}
