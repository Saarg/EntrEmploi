angular.module('EntrEmploi').factory('StaffService', StaffService);

StaffService.$inject = ['$http', '$window'];

function StaffService($http, $window) {
    return {
        getUsers : function() {
            return $http.get('/api/staff?token='+ $window.sessionStorage.token);
        },
        getUser : function(userId) {
            return $http.get('/api/staff/'+userId +'?token='+ $window.sessionStorage.token);
        },
        postUser : function (user) {
            return $http.post('/api/staff', {
                token: $window.sessionStorage.token,
                nom: user.nom,
                prenom: user.prenom,
                accesLevel: user.accesLevel,
                passwd: user.passwd
            });
        },
        editUser : function(user) {
            return $http.put('/api/staff/' + user._id, {
                token: $window.sessionStorage.token,
                nom: user.nom,
                prenom: user.prenom,
                tel : user.tel,
                mail : user.mail,
                adresse :user.adresse,
                compAdresse : user.compAdresse,
                ville : user.ville,
                codePostal : user.codePostal,
                accesLevel: user.accesLevel,
                newPasswd: user.newPasswd
            });
        },
        deleteUser : function(user_id) {
            return $http.delete( '/api/staff/' + user_id +'?token='+ $window.sessionStorage.token);
        }
    };
}
