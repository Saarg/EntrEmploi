angular.module('StaffService', []).factory('StaffService', StaffService);

StaffService.$inject = ['$http', '$window'];

function StaffService($http, $window) {
    return {
        getUsers : function() {
            return $http.get('/api/staff?token='+ $window.sessionStorage.token);
        },
        getUser : function(userId) {
            return $http.get('/api/staff/'+userId +'?token='+ $window.sessionStorage.token);
        },
        editUser : function(user) {
            return $http.put('/api/staff/' + user._id, {
                token: $window.sessionStorage.token,
                nom: user.nom,
                prenom: user.prenom,
                accesLevel: user.accesLevel
            });
        },
        deleteUser : function(user_id) {
            return $http.delete( '/api/staff/' + user_id +'?token='+ $window.sessionStorage.token);
        }
    };
}
