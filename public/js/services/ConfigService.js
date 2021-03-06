angular.module('EntrEmploi').factory('ConfigService', ConfigService);

ConfigService.$inject = ['$http', '$window'];

function ConfigService($http, $window) {
    return {
        addConfig : function(name, value) {
            return $http.post('/api/config?token='+ $window.localStorage.token, {
                name: name,
                value: value
            });
        },
        editConfig : function(name, value) {
            return $http.put('/api/config/'+name, { token: $window.localStorage.token,
                name: name,
                value: value
            });
        },
        editConfigById : function(id, value) {
            return $http.put('/api/config/id/'+id, { token: $window.localStorage.token,
                value: value
            });
        },
        getConfig : function(name) {
            return $http.get('/api/config/'+name);
        },
        getConfigAll : function(name) {
            return $http.get('/api/config/all/'+name);
        },
        deleteConfig : function(id) {
            return $http.delete('/api/config/'+id +'?token='+ $window.localStorage.token);
        }
    }
}
