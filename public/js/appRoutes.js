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
	    controller: 'BenevoleController',
        resolve: {
            logged: function(Auth){
                return Auth.logged();
            }
        }
	})
    .when('/login', {
	    templateUrl: 'views/login.html',
	    controller: 'AuthController',
	})
	.otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);
