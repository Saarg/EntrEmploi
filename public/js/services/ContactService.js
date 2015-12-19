angular.module('ContactService', []).factory('Contact', ['$http', function($http) {
    return {
        getAppels : function() {
            return $http.get('/api/appelsBenevole');
        },
        sendMail : function($scope) {
            return $http.post('/contact/send', {
                sender: $scope.mail.email,
                sujet: $scope.mail.sujet,
                message: $scope.mail.message
            });
        }
    }
}]);
