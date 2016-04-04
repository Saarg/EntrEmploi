angular.module('EntrEmploi').factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$window', '$location'];

function AuthService($http, $window, $location) {
    return {
        loggin : function($scope) {
            return $http.post('/login', { nom: $scope.user.nom.toLowerCase(),
                prenom: $scope.user.prenom.toLowerCase(),
                passwd: $scope.user.password
            });
        },
        logged: function(){
            var token = $window.localStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token })
                res.then(function(res){
                    if(res.data.success == false) {
                        delete $window.localStorage.token;
                        delete $window.localStorage.user_id
                        delete $window.localStorage.nom;
                        delete $window.localStorage.prenom;
                        delete $window.localStorage.accesLevel;

                        $window.location.reload();
                    }
                });
                if(res.success){
                    return true;
                }
            }
            return false;
        },
        decodeToken: function(){
            var token   = $window.localStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        },
        isLoggedIn: function() {
            return $http.get('/passwordless/isLoggedIn');
        },
        loginEntreprise : function(entreprise) {
            return $http.post('/passwordless/sendtoken', { user: entreprise });
        }
    }
}
