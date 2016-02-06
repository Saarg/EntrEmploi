angular.module('EntrEmploi').factory('ContactService', ContactService);

ContactService.$inject = ['$http'];

function ContactService($http) {
    return {
        getAppels : function() {
            return $http.get('/api/appelsBenevole');
        },
        sendMail : function($scope) {
            var sujet = '[' + $scope.mail.nom + '] ' + $scope.mail.sujet
            return $http.post('/contact/send', {
                sender: $scope.mail.email,
                sujet: sujet,
                message: $scope.mail.message
            });
        }
    }
}
