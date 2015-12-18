angular.module('AuthService', []).factory('AuthService', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);
