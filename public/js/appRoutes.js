angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
	.when('/', {
	    templateUrl: 'views/home.html',
	    controller: 'MainController'
	})
	.when('/offres', {
	    templateUrl: 'views/offres.html',
	    controller: 'OffresController'
	})
	.when('/recruteur', {
	    templateUrl: 'views/recruteur.html',
	    controller: 'RecruteurController'
	})
	.when('/staff', {
	    templateUrl: 'views/staff.html',
	    controller: 'StaffController'
	})
	.when('/benevole', {
	    templateUrl: 'views/benevole.html',
	    controller: 'BenevoleController'
	})
    .when('/login', {
	    templateUrl: 'views/login.html',
	    controller: 'AuthController'
	})
    .when('/admin', {
        templateUrl: 'views/admin.html',
	    controller: 'AdminController',
        resolve: {
            logged: function(Auth){
                return Auth.logged();
            }
        }
    })
	.otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);
