angular.module('StaffService', []).factory('StaffService', StaffService);

StaffService.$inject = ['$http', '$window'];

function StaffService($http, $window) {
    return {
        getUsers : function() {
            return $http.get('/api/staff');
        },
        getUser : function(userId) {
            return $http.get('/api/staff/'+userId +'?token='+ $window.sessionStorage.token);
        }
    };
}
