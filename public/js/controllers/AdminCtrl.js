angular.module('EntrEmploi').controller('AdminController', AdminController)


AdminController.$inject =['$scope', '$filter', 'Upload', 'AdminService', 'HomeService', 'PrestationsService', 'OffresService', 'ProfilsService', 'PartenairesService', 'StaffService', 'ConfigService', '$window', 'ngDialog'];

function AdminController(
    $scope,
    $filter,
    Upload,
    AdminService,
    HomeService,
    PrestationsService,
    OffresService,
    ProfilsService,
    PartenairesService,
    StaffService,
    ConfigService,
    $window,
    ngDialog
) {

    $scope.accesLevel = $window.localStorage.accesLevel;

    // ======  HOME  ======
    // GET
    HomeService.getArticleCount().then(function(res){
        $scope.MainArticlesCount  = res.data;
    });
    ConfigService.getConfigAll("carousel").then(function(res) {
        $scope.images = res.data;
    });

    var processArticle = function(a) {
        a.contenu = a.contenu.replace(/<br\s*[\/]?>/gi, "\n");
        a.image = a.lienMedia;
    }

    var sortArticles = function() {
        $scope.MainArticlesSorted  = $filter('orderBy')($scope.MainArticles, 'priority');
    }

    $scope.loadArticles = function () {
        HomeService.getArticles().then(function(res){
            $scope.MainArticles  = res.data;
            for(var i in $scope.MainArticles){
                processArticle($scope.MainArticles[i]);
                if($scope.MainArticles[i].media == "Vidéo") { $scope.MainArticles[i].lienMediaYT = $scope.MainArticles[i].lienMedia }
            }
            sortArticles();
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
                var a = res.data.article;
                processArticle(a);
                $scope.MainArticles.push(a);
                sortArticles();
                $scope.AAsuccess = "L'article a bien été ajouté";
            } else {
                delete $scope.AAsuccess;
                $scope.AAalert = res.data.message;
            }
        });
        $scope.newArticle = {};
        $scope.newArticle.media = "Aucun";
    }
    $scope.newImg = {};
    $scope.newImagePopup = function () {
        ngDialog.open({
            template : '../templates/newImg.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
    $scope.addImg = function() {
        ConfigService.addConfig("carousel", $scope.newImg.image.resized.dataURL).then(function (res) {
            $scope.images.push(res.data.config);
        });
        return 1;
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
    $scope.editImg = function() {
        console.log($scope.images[$scope.curImgIndex]._id);
        ConfigService.editConfigById($scope.images[$scope.curImgIndex]._id, $scope.images[$scope.curImgIndex].image.resized.dataURL).then(function (res) {

        });
        return 1;
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
    $scope.deleteArticle = function () {
        HomeService.deleteArticle($scope.MainArticlesSorted[$scope.curArticleIndex]._id).then(function () {
            $scope.MainArticles.splice($scope.MainArticles.indexOf($scope.MainArticlesSorted[$scope.curArticleIndex]), 1);
            sortArticles();
        });
    }
    $scope.deleteImage = function () {
        ConfigService.deleteConfig($scope.images[$scope.curImgIndex]._id).then(function () {
            $scope.images.splice($scope.curImgIndex, 1);
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
    $scope.curImgIndex = 0;
    $scope.activateImg = function(index) {
        $scope.curImgIndex = index;
    }
    $scope.reload = function() {
        $window.location.reload(true);
    }

    // =========== PRESTATIONS ================ //

    PrestationsService.getPrestations().then(function (res) {
        $scope.prestations = res.data;
        console.log($scope.prestations);
    });

    $scope.addPrestation = function (newPrestation) {
        PrestationsService.postPrestation(newPrestation).then(function () {
            $scope.prestations.push(newPrestation);
        });
        $scope.newPrestation = {}; // reset la nouvelle prestation
        return 1;
    }

    $scope.editPrestation = function (index) {
        PrestationsService.editPrestation($scope.prestations[index]).then(function (res) {
            if(res.data.success){
                delete $scope.EPRalert;
                $scope.EPRsuccess = "La prestation a bien été édité";
            } else {
                delete $scope.EPRsuccess;
                $scope.EPRalert = res.data.message;
            }
        });
    }

    $scope.curPrestationIndex = 0;

    $scope.activatePrestation = function(index) {
        delete $scope.EPRalert;
        delete $scope.EPRsuccess;
        $scope.curPrestationIndex = index;
    }

    $scope.newPrestation = {};
    $scope.newPrestationPopup = function () {
        ngDialog.open({
            template : '../templates/newPrestation.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }

    $scope.deletePrestation = function (index) {
        PrestationsService.deletePrestation($scope.prestations[index]).then(function () {
            $scope.prestations.splice(index, 1);
        })
    }

    $scope.deleteParticipant = function (participant, index) {
        PrestationsService.deleteParticipant(participant, $scope.prestations[index]).then(function () {
            $scope.prestations[index].inscrits.splice($scope.prestations[index].inscrits.indexOf(participant), 1);
        })
    }
    // ====== PROFIL ======

    ProfilsService.getProfils().then(function (res) {
        $scope.profils = res.data;
    });

    $scope.newProfil = {};
    $scope.addProfil = function () {
        ProfilsService.postProfil($scope.newProfil).then(function (res) {
            if(res.data.success) {
                $scope.profils.push(res.data.profil);
                $scope.newProfil = {}; // reset
            } else {
                $log.error(res.data.message);
            }
        });
        return 1;
    }

    $scope.uploadCV = function() {
        var cur = $scope.profils[$scope.curProfilIndex];
        Upload.upload({
            headers: { "x-access-token": $window.localStorage.token },
            url: 'api/profils/upload/'+cur._id,
            method: 'POST',
            data: {file: cur.CV}
        }).progress(function(evt) {
            $log.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function() {
            $scope.profils[$scope.curProfilIndex].cv = true;
            $log.log('done');
        });
    }
    $scope.editProfil = function () {
        ProfilsService.editProfil($scope.profils[$scope.curProfilIndex]).then(function (res) {
            if(res.data.success){
                delete $scope.EPalert;
                $scope.EPsuccess = "Le profil a bien été édité";
            } else {
                delete $scope.EPsuccess;
                $scope.EPalert = res.data.message;
            }
        });
    }

    $scope.curProfilIndex = 0;
    $scope.activateProfil = function(index) {
        delete $scope.EPalert;
        delete $scope.EPsuccess;
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

    // Filtres de recherche
    $scope.filtre = {ville:0, villeList: ["Toutes villes"], job:0, jobList: ["Tous métier"], nom: "", prenom: ""};
    $scope.showProfil = function(profil) {
        // On en profite pour lister les villes et jobs
        if($scope.filtre.villeList.indexOf(profil.ville.toLowerCase()) == -1)
            $scope.filtre.villeList.push(profil.ville.toLowerCase());
        if($scope.filtre.jobList.indexOf(profil.job.toLowerCase()) == -1)
            $scope.filtre.jobList.push(profil.job.toLowerCase());
        // On applique le filtre
        if ($scope.filtre.ville != 0 && $scope.filtre.villeList[$scope.filtre.ville].toLowerCase() != profil.ville.toLowerCase())
            return false;
        else if ($scope.filtre.job != 0 && $scope.filtre.jobList[$scope.filtre.job].toLowerCase() != profil.job.toLowerCase())
            return false;
        else if ($scope.filtre.nom != "" && !profil.nom)
            return false;
        else if ($scope.filtre.nom != "" && profil.nom && $scope.filtre.nom.toLowerCase() != profil.nom.substring(0, $scope.filtre.nom.length).toLowerCase())
            return false;
        else if ($scope.filtre.prenom != "" && $scope.filtre.prenom.toLowerCase() != profil.prenom.substring(0, $scope.filtre.prenom.length).toLowerCase())
            return false;
        else
            return true;
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
    if($scope.accesLevel == 3)
    $scope.accesValues.push("Dev")

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
        StaffService.postUser($scope.newUser).then(function (res) {
            $scope.users.push(res.data.user);
        });
        $scope.newUser = {};
        return 1;
    }
    // EDIT
    $scope.editUser = function (user) {
        StaffService.editUser(user).then(function (res) {
            if(res.data.success){
                delete $scope.ESalert;
                $scope.ESsuccess = "Le profil a bien été édité";
            } else {
                delete $scope.ESsuccess;
                $scope.ESalert = res.data.message;
            }
        });
    }
    $scope.infoUserPopup = function () {
        //users[curUserIndex]
        ngDialog.open({
            template : '../templates/infoUser.html',
            className: 'ngdialog-theme-default',
            disableAnimation : true,
            scope: $scope
        });
    }
    // DELETE
    $scope.deleteUser = function (index) {
        StaffService.deleteUser($scope.users[index]._id).then(function () {
            $scope.users.splice(index, 1);
        });
    }
    $scope.curUserIndex = -1;
    $scope.activateUser = function(index) {
        delete $scope.ESalert;
        delete $scope.ESsuccess;
        $scope.curUserIndex = index;
    }

    $scope.filtreStaff = {nom: "", prenom: ""};
    $scope.showStaff = function(profil) {
        // On applique le filtre
        if ($scope.filtre.nom != "" && profil.nom && $scope.filtre.nom.toLowerCase() != profil.nom.substring(0, $scope.filtre.nom.length).toLowerCase())
            return false;
        else if ($scope.filtre.prenom != "" && $scope.filtre.prenom.toLowerCase() != profil.prenom.substring(0, $scope.filtre.prenom.length).toLowerCase())
            return false;
        else
            return true;
    }

    // ==== PARTENAIRE ====
    PartenairesService.getPartenaires().then(function (res) {
        $scope.partenaires = res.data;
    });

    // ADD
    $scope.newPartenaire = {};
    $scope.addPartenaire = function (newPartenaire) {
        PartenairesService.postPartenaire(newPartenaire).then(function (res) {
            $scope.partenaires.push(res.data.partenaire);
        });
        return 1;
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
    }
    // DELETE
    $scope.deletePartenaire = function (partenaire) {
        PartenairesService.deletePartenaire(partenaire._id).then(function () {
            $scope.partenaires.splice($scope.partenaires.indexOf(partenaire), 1);
        });
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
    }

}
