angular.module('EntrEmploi').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/offres', {
        templateUrl: 'views/offres.html',
        controller: 'OffresController'
    })
    .when('/profils', {
        templateUrl: 'views/profils.html',
        controller: 'ProfilsController'
    })
    .when('/staff', {
        templateUrl: 'views/staff.html',
        controller: 'StaffController'
    })
    .when('/prestations', {
        templateUrl: 'views/prestations.html',
        controller: 'PrestationsController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
    })
    .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController',
        resolve: {
            logged: function(AuthService, $location){
                if(!AuthService.logged())
                    $location.path('/login');

                return true;
            }
        }
    })
    .when('/profil', {
        templateUrl: 'views/profil.html',
        controller: 'ProfilController',
        resolve: {
            logged: function(AuthService, $location){
                if(!AuthService.logged())
                    $location.path('/login');

                return true;
            }
        }
    })
    .when('/profilEntreprise', {
        templateUrl: 'views/entreprise.html',
        controller: 'EntrepriseController'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);
