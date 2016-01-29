angular.module('AdminCtrl', ['ngDialog', 'ngFileUpload']).controller('AdminController', AdminController)

AdminController.$inject =['$scope', '$filter', 'Upload', 'AdminService', 'HomeService', 'OffresService', 'ProfilsService', 'PartenairesService', 'StaffService', 'ConfigService', '$window', 'ngDialog'];

function AdminController($scope, $filter, Upload, AdminService, HomeService, OffresService, ProfilsService, PartenairesService, StaffService, ConfigService, $window, ngDialog) {
    $scope.accesLevel = $window.sessionStorage.accesLevel;

    // ======  HOME  ======
    // GET
    HomeService.getArticleCount().then(function(res){
        $scope.MainArticlesCount  = res.data;
    });

    $scope.loadArticles = function () {
        HomeService.getArticles().then(function(res){
            $scope.MainArticles  = res.data;
            for(var i in $scope.MainArticles){
                $scope.MainArticles[i].contenu = $scope.MainArticles[i].contenu.replace(/<br\s*[\/]?>/gi, "\n");
                $scope.MainArticles[i].image = $scope.MainArticles[i].lienMedia;
            }
            $scope.MainArticlesSorted  = $filter('orderBy')($scope.MainArticles, 'priority');
        });
    }
    $scope.loadArticles();

    // ADD
    $scope.newArticle = {};
    $scope.newArticle.media = "Aucun";
    $scope.addArticle = function () {
        if(!$scope.newArticle.priority) {
            $scope.newArticle.priority = $scope.MainArticlesSorted[$scope.MainArticlesCount]+1;
        }
        HomeService.postArticle($scope.newArticle).then(function (res) {
            if(res.data.success){
                delete $scope.AAalert;
                $scope.AAsuccess = "L'article a bien été ajouté";
            } else {
                delete $scope.AAsuccess;
                $scope.AAalert = res.data.message;
            }
        });
        $scope.loadArticles();
        $scope.newArticle = {};
        $scope.newArticle.media = "Aucun";
    }

    // EDIT
    $scope.currentArticle = {}
    $scope.editArticle = function () {
        $scope.currentArticle = $scope.MainArticlesSorted[$scope.curArticleIndex];
        HomeService.editArticle($scope.currentArticle).then(function (res) {
            if(res.data.success){
                delete $scope.EAalert;
                $scope.EAsuccess = "L'article a bien été édité";
            } else {
                delete $scope.EAsuccess;
                $scope.EAalert = res.data.message;
            }
        });
    }
    $scope.infoArticle = function () {
        $scope.currentArticle = $scope.MainArticlesSorted[$scope.curArticleIndex];

        StaffService.getUser($scope.currentArticle._auteur).then(function(res){
            $scope.currentArticle.auteur  = res.data[0];
        });
        StaffService.getUser($scope.currentArticle._editeur).then(function(res){
            $scope.currentArticle.editeur  = res.data[0];
        });
        ngDialog.open({
            template : '../templates/infoArticle.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    // DELETE
    $scope.deleteArticle = function (index) {
        HomeService.deleteArticle($scope.MainArticlesSorted[$scope.curArticleIndex]._id).then(function () {
            $scope.MainArticles.splice(index, 1);
            $scope.MainArticlesSorted  = $filter('orderBy')($scope.MainArticles, 'priority');
        });
    }

    // UTILS
    $scope.curArticleIndex = 0;
    $scope.activateArticle = function(index) {
        delete $scope.EAalert;
        delete $scope.EAsuccess;
        delete $scope.AAalert;
        delete $scope.AAsuccess;
        $scope.curArticleIndex = index;
    }
    $scope.reload = function() {
        $window.location.reload(true);
    }

    // =========== OFFRES ================ //

    OffresService.getOffres().then(function (res) {
        $scope.offres = res.data;
    });

    $scope.addOffre = function (newOffre) {
        OffresService.postOffre(newOffre).then(function () {
            $scope.offres.push(newOffre);
        });
        $scope.newOffre = {}; // reset la nouvelle offre
    }

    $scope.editOffre = function (index) {
        OffresService.editOffre($scope.offres[index]).then(function () {

        });
    }

    $scope.curOffreIndex = 0;
    $scope.activateOffre = function(index) {
        $scope.curOffreIndex = index;
    }

    $scope.newOffre = {};
    $scope.newOffrePopup = function () {
        ngDialog.open({
            template : '../templates/newOffre.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    $scope.deleteOffre = function (index) {
        OffresService.deleteOffre($scope.offres[index]).then(function () {
            $scope.offres.splice(index, 1);
        })
    }

    // ====== PROFIL ======

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    $scope.newProfil = {};
    $scope.addProfil = function () {
        ProfilsService.postProfil($scope.newProfil).then(function () {
            $scope.profils.push($scope.newProfil);
        });
        $scope.newProfil = {}; // reset
    }

    $scope.uploadCV = function() {
        cur = $scope.profils[$scope.curProfilIndex];
        Upload.upload({
            headers: { "x-access-token": $window.sessionStorage.token },
            url: 'api/profils/upload/'+cur._id,
            method: 'POST',
            data: {file: cur.CV}
        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            console.log('done');
        });
    }
    $scope.editProfil = function () {
        ProfilsService.editProfil($scope.profils[$scope.curProfilIndex]).then(function () {

        });
    }

    $scope.curProfilIndex = 0;
    $scope.activateProfil = function(index) {
        $scope.curProfilIndex = index;
    }

    $scope.newProfil = {};
    $scope.newProfilPopup = function () {
        ngDialog.open({
            template : '../templates/newProfil.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    $scope.deleteProfil = function () {
        ProfilsService.deleteProfil($scope.profils[$scope.curProfilIndex]).then(function () {
            $scope.profils.splice($scope.curProfilIndex, 1);
        })
    }

    // ====== HEADER ======
    $scope.logoSPF = {};
    ConfigService.getConfig("LogoSPF").then(function(res){
        $scope.logoSPF.image = res.data;
    });
    $scope.editLogoSPF = function () {
        ConfigService.editConfig("LogoSPF", $scope.logoSPF.image.resized.dataURL);
        $window.location.reload(true);
    }
    $scope.logoEntrEmploi = {};
    ConfigService.getConfig("LogoEntrEmploi").then(function(res){
        $scope.logoEntrEmploi.image = res.data;
    });
    $scope.editLogoEntrEmploi = function () {
        ConfigService.editConfig("LogoEntrEmploi", $scope.logoEntrEmploi.image.resized.dataURL);
        $window.location.reload(true);
    }

    // ====== STAFF  ======
    $scope.accesValues = ["Lecture CV & prestations","Ecriture CV & prestations","Administation du site"];

    $scope.loadUsers = function () {
        StaffService.getUsers().then(function(res){
            $scope.users  = res.data;
        });
    }
    $scope.loadUsers();
    // ADD
    $scope.newUser = {};
    $scope.newUserPopup = function () {
        $scope.newUser.accesLevel = 0;
        ngDialog.open({
            template : '../templates/newUser.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
    $scope.addUser = function () {
        // TODO generation aleatoire password
        StaffService.postUser($scope.newUser);
        $scope.loadUsers();
        $scope.newUser = {};
    }
    // EDIT
    $scope.editUser = function (user) {
        StaffService.editUser(user);
    }
    // DELETE
    $scope.deleteUser = function (index) {
        StaffService.deleteUser($scope.users[index]._id).then(function () {
            $scope.users.splice(index, 1);
        });
    }

    $scope.curUserIndex = 0;
    $scope.activateUser = function(index) {
        $scope.curUserIndex = index;
    }

    // ==== PARTENAIRE ====
    PartenairesService.getPartenaires().then(function (res) {
        $scope.Partenaires = res.data;
    });

    // ADD
    $scope.newPartenaire = {};
    $scope.addPartenaire = function (newPartenaire) {
        PartenairesService.postPartenaire(newPartenaire);
        $window.location.reload(true);
    }
    $scope.PartenairePopup = function () {
        ngDialog.open({
            template : '../templates/newPartenaire.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
    // EDIT
    $scope.editPartenaire = function (partenaire) {
        PartenairesService.editPartenaire(partenaire);
        $window.location.reload(true);
    }
    // DELETE
    $scope.deletePartenaire = function (partenaire_id) {
        PartenairesService.deletePartenaire(partenaire_id);
        $window.location.reload(true);
    }

    // ====== COORDS ======
    $scope.addr = [];
    ConfigService.getConfig("addr1").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr2").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr3").then(function(res){
        $scope.addr.push(res.data);
    });
    ConfigService.getConfig("addr4").then(function(res){
        $scope.addr.push(res.data);
    });
    // EDIT
    $scope.editAddr = function (index, value) {
        ConfigService.editConfig("addr"+(index+1), value);
        $window.location.reload(true);
    }

}
