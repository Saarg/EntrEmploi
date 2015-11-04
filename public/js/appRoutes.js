angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
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
	});

    $locationProvider.html5Mode(true);

}]);

angular.module('appAdminRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
	.when('/admin/auth', {
	    templateUrl: 'views/auth.html',
	    controller: 'AuthController'
	});

    $locationProvider.html5Mode(true);

}]);
