angular.module('EntrEmploi').factory('ProfilsService', ProfilsService);

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
                token: $window.localStorage.token,
                nom : profil.nom,
                prenom : profil.prenom,
                ville : profil.ville,
                job : profil.job,
                accroche : profil.accroche
            });
        },
        editProfil : function (profil) {
            return $http.put('/api/profils/' + profil._id, {
                token: $window.localStorage.token,
                nom : profil.nom,
                prenom : profil.prenom,
                ville : profil.ville,
                job : profil.job,
                accroche : profil.accroche
            });
        },
        deleteProfil : function (profil) {
            return $http.delete('/api/profils/' + profil._id + '?token=' + $window.localStorage.token);
        }
    }
}
