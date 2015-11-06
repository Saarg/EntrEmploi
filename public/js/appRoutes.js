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
	.otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);

angular.module('appAdminRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push(['$q', '$window', function($q, $window) {
	return {
	    'request': function(config) {
		if ($window.sessionStorage.token) {
		    config.headers['x-access-token'] = $window.sessionStorage.token;
		}
		return config;
	    }
	};
    }]);
    
    $routeProvider
	.when('/admin/', {
	    templateUrl: 'views/mainAdmin.html',
	    controller: 'MainAdminController'
	})
	.when('/login', {
	    templateUrl: 'views/auth.html',
	    controller: 'AuthController'
	})
	.otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);

