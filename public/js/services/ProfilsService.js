angular.module('ProfilsService', []).factory('ProfilsService', ProfilsService);

ProfilsService.$inject = ['$http', '$window'];

function ProfilsService($http, $window) {
    return {
        getProfils : function() {
            return $http.get('/api/profils');
        },
        getProfilsCount : function() {
            return $http.get('/api/profils/count');
        },
        postProfil : function (profil) {
            return $http.post('/api/profils', {
                token: $window.sessionStorage.token,
                nom : profil.nom,
                prenom : profil.prenom,
                accroche : profil.accroche,
                CV : profil.CV
            });
        },
        editProfil : function (profil) {
            return $http.put('/api/profils/' + profil._id, {
                token: $window.sessionStorage.token,
                nom : profil.nom,
                prenom : profil.prenom,
                accroche : profil.accroche,
                CV : profil.CV
            });
        },
        deleteProfil : function (profil) {
            return $http.delete('/api/profils/' + profil._id + '?token=' + $window.sessionStorage.token);
        }
    }
}
