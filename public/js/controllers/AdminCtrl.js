angular.module('AdminCtrl', ['ngDialog']).controller('AdminController', AdminController)

AdminController.$inject =['$scope', '$filter', 'AdminService', 'HomeService', 'OffresService', 'PartenairesService', 'StaffService', 'ConfigService', '$window', 'ngDialog'];

function AdminController($scope, $filter, AdminService, HomeService, OffresService, PartenairesService, StaffService, ConfigService, $window, ngDialog) {
    $scope.accesLevel = $window.sessionStorage.accesLevel;

    // ======  HOME  ======
    // GET
    HomeService.getArticleCount().then(function(res){
        $scope.MainArticlesCount  = res.data;
    });

    HomeService.getArticles().then(function(res){
        $scope.MainArticles  = res.data;
        for(var i in $scope.MainArticles){
            $scope.MainArticles[i].contenu = $scope.MainArticles[i].contenu.replace(/<br\s*[\/]?>/gi, "\n");
            $scope.MainArticles[i].image = $scope.MainArticles[i].lienMedia;
        }
        $scope.MainArticlesSorted  = $filter('orderBy')($scope.MainArticles, 'priority');
    });

    // ADD
    $scope.newArticle = {};
    $scope.addArticle = function () {
        if(!$scope.newArticle.priority) {
            $scope.newArticle.priority = $scope.MainArticlesSorted[$scope.MainArticlesCount]+1;
        }
        HomeService.postArticle($scope.newArticle);
        $window.location.reload(true);
    }

    // EDIT
    $scope.currentArticle = {}
    $scope.editArticle = function (index) {
        $scope.currentArticle = $scope.MainArticles[index];
        HomeService.editArticle($scope.currentArticle);
        $window.location.reload(true);
    }
    $scope.infoArticle = function (index) {
        $scope.currentArticle = $scope.MainArticles[index];

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
    $scope.deleteArticle = function (article_id) {
        HomeService.deleteArticle(article_id);
        $window.location.reload(true);
    }

    $scope.ArticleTracker = function(article) {
        return article.priority + article.titre;
    }
    $scope.reload = function() {
        $window.location.reload(true);
    }

    // =========== OFFRES ================ //

    OffresService.getOffres().then(function (res) {
        $scope.offres = res.data;
    });

    $scope.addOffre = function (newOffre) {
        OffresService.postOffre(newOffre);
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
        OffresService.deleteOffre($scope.offres[index]);
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
    StaffService.getUsers().then(function(res){
        $scope.users  = res.data;
    });
    // ADD
    $scope.newUser = {};
    $scope.addUser = function (newUser) {
        // TODO generation aleatoire password
        StaffService.postUser(newUser);
        $window.location.reload(true);
    }
    // EDIT
    $scope.editUser = function (user) {
        StaffService.editUser(user);
        $window.location.reload(true);
    }
    // DELETE
    $scope.deleteUser = function (user_id) {
        StaffService.deleteUser(user_id);
        $window.location.reload(true);
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
