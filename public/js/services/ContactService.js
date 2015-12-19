angular.module('ContactService', []).factory('Contact', ['$http', function($http) {
    return {
        getAppels : function() {
            return $http.get('/api/appelsBenevole');
        },
        sendMail : function($scope) {
            sujet = '[' + $scope.mail.nom + '] ' + $scope.mail.sujet
            return $http.post('/contact/send', {
                sender: $scope.mail.email,
                sujet: sujet,
                message: $scope.mail.message
            });
        }
    }
}]);
