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
            logged: ['$window', '$location', function($window, $location){
                if(!$window.sessionStorage.token){
                    $location.path('/login');
                    $location.replace();
                }
            }]
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
