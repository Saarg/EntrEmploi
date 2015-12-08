angular.module('EntrEmploi', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'OffresCtrl', 'OffresService', 'RecruteurCtrl', 'RecruteurService', 'StaffCtrl', 'StaffService', 'BenevoleCtrl', 'BenevoleService', 'AuthCtrl', 'AuthService', 'AdminCtrl', 'AdminService']);


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

$(function() {

    $('#carousel-temoins').carousel({

    });
});

angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {

    }
}]);

angular.module('AuthService', []).factory('Auth', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);

angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);

angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);

angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);

angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);

angular.module('StaffService', []).factory('Staff', ['$http', function($http) {
    return {
	// gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
	// gestion des profils
	getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
	// gestion des articles de la mainpage
	getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    }     
}]);

angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', '$window', function($scope, Auth, $window) {

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
              if (panes.length == 0) $scope.select(pane);
              panes.push(pane);
            }
        },
        template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
    };
});

angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    $location.path("/admin");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);

angular.module('BenevoleCtrl', []).controller('BenevoleController', function($scope) {

	$scope.tagline = 'pour les benevoles';	

});

angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);

angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
            { text : "Super Equipe !" },
            { text : "Pas Mal du tout" },
            { text : "J'ai trouvé un boulot !" }
        ];

    $scope.images = [
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
        ];
});

angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);

angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});

angular.module('RecruteurCtrl', []).controller('RecruteurController', function($scope) {

	$scope.tagline = 'Tu es un Recruteur?';	

});

angular.module('StaffCtrl', []).controller('StaffController', function($scope) {

	$scope.tagline = 'Staff';	

});

angular.module('EntrEmploi', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'OffresCtrl', 'OffresService', 'RecruteurCtrl', 'RecruteurService', 'StaffCtrl', 'StaffService', 'BenevoleCtrl', 'BenevoleService', 'AuthCtrl', 'AuthService', 'AdminCtrl', 'AdminService']);


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

$(function() {

    $('#carousel-temoins').carousel({

    });
});

angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', '$window', function($scope, Auth, $window) {

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
              if (panes.length == 0) $scope.select(pane);
              panes.push(pane);
            }
        },
        template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
    };
});

angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    $location.path("/admin");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);

angular.module('BenevoleCtrl', []).controller('BenevoleController', function($scope) {

	$scope.tagline = 'pour les benevoles';	

});

angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);

angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
            { text : "Super Equipe !" },
            { text : "Pas Mal du tout" },
            { text : "J'ai trouvé un boulot !" }
        ];

    $scope.images = [
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
        ];
});

angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);

angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});

angular.module('RecruteurCtrl', []).controller('RecruteurController', function($scope) {

	$scope.tagline = 'Tu es un Recruteur?';	

});

angular.module('StaffCtrl', []).controller('StaffController', function($scope) {

	$scope.tagline = 'Staff';	

});

angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {

    }
}]);

angular.module('AuthService', []).factory('Auth', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);

angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);

angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);

angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);

angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);

angular.module('StaffService', []).factory('Staff', ['$http', function($http) {
    return {
	// gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
	// gestion des profils
	getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
	// gestion des articles de la mainpage
	getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    }     
}]);

angular.module('EntrEmploi', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'OffresCtrl', 'OffresService', 'RecruteurCtrl', 'RecruteurService', 'StaffCtrl', 'StaffService', 'BenevoleCtrl', 'BenevoleService', 'AuthCtrl', 'AuthService', 'AdminCtrl', 'AdminService']);


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

$(function() {

    $('#carousel-temoins').carousel({

    });
});

angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', '$window', function($scope, Auth, $window) {

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
              if (panes.length == 0) $scope.select(pane);
              panes.push(pane);
            }
        },
        template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
    };
});

angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    $location.path("/admin");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);

angular.module('BenevoleCtrl', []).controller('BenevoleController', function($scope) {

	$scope.tagline = 'pour les benevoles';	

});

angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);

angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
            { text : "Super Equipe !" },
            { text : "Pas Mal du tout" },
            { text : "J'ai trouvé un boulot !" }
        ];

    $scope.images = [
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
        ];
});

angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);

angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});

angular.module('RecruteurCtrl', []).controller('RecruteurController', function($scope) {

	$scope.tagline = 'Tu es un Recruteur?';	

});

angular.module('StaffCtrl', []).controller('StaffController', function($scope) {

	$scope.tagline = 'Staff';	

});

angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {

    }
}]);

angular.module('AuthService', []).factory('Auth', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);

angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);

angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);

angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);

angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);

angular.module('StaffService', []).factory('Staff', ['$http', function($http) {
    return {
	// gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
	// gestion des profils
	getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
	// gestion des articles de la mainpage
	getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    }     
}]);

angular.module('EntrEmploi', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'OffresCtrl', 'OffresService', 'RecruteurCtrl', 'RecruteurService', 'StaffCtrl', 'StaffService', 'BenevoleCtrl', 'BenevoleService', 'AuthCtrl', 'AuthService', 'AdminCtrl', 'AdminService']);


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

$(function() {

    $('#carousel-temoins').carousel({

    });
});

angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', '$window', function($scope, Auth, $window) {

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
              if (panes.length == 0) $scope.select(pane);
              panes.push(pane);
            }
        },
        template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
    };
});

angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    $location.path("/admin");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);

angular.module('BenevoleCtrl', []).controller('BenevoleController', function($scope) {

	$scope.tagline = 'pour les benevoles';	

});

angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);

angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
            { text : "Super Equipe !" },
            { text : "Pas Mal du tout" },
            { text : "J'ai trouvé un boulot !" }
        ];

    $scope.images = [
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
        ];
});

angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);

angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});

angular.module('RecruteurCtrl', []).controller('RecruteurController', function($scope) {

	$scope.tagline = 'Tu es un Recruteur?';	

});

angular.module('StaffCtrl', []).controller('StaffController', function($scope) {

	$scope.tagline = 'Staff';	

});

angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {

    }
}]);

angular.module('AuthService', []).factory('Auth', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);

angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);

angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);

angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);

angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);

angular.module('StaffService', []).factory('Staff', ['$http', function($http) {
    return {
	// gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
	// gestion des profils
	getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
	// gestion des articles de la mainpage
	getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    }     
}]);

angular.module('EntrEmploi', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'OffresCtrl', 'OffresService', 'RecruteurCtrl', 'RecruteurService', 'StaffCtrl', 'StaffService', 'BenevoleCtrl', 'BenevoleService', 'AuthCtrl', 'AuthService', 'AdminCtrl', 'AdminService']);


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

$(function() {

    $('#carousel-temoins').carousel({

    });
});

angular.module('AdminCtrl', []).controller('AdminController', ['$scope', 'Admin', '$window', function($scope, Auth, $window) {

}])
.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
              if (panes.length == 0) $scope.select(pane);
              panes.push(pane);
            }
        },
        template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
    };
})
.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
    };
});

angular.module('AuthCtrl', []).controller('AuthController', ['$scope', 'Auth', '$window', '$location', function($scope, Auth, $window, $location) {
    if ($window.sessionStorage.nom)
        $scope.message = "déjà co";
    $scope.submit = function () {
        Auth.loggin($scope).then(function(res){
    	$scope.success = res.data.success;
    	$scope.message = res.data.message;

    	if(res.data.success) {
    	    $window.sessionStorage.token = res.data.token;
    	    $window.sessionStorage.nom = res.data.nom;
    	    $window.sessionStorage.prenom = res.data.prenom;
    	    $location.path("/admin");
    	} else {
    	    delete $window.sessionStorage.token;
    	    delete $window.sessionStorage.nom;
    	    delete $window.sessionStorage.prenom;
    	}
    	});
	};
}]);

angular.module('BenevoleCtrl', []).controller('BenevoleController', function($scope) {

	$scope.tagline = 'pour les benevoles';	

});

angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', '$window', '$location', function($scope, Main, $window, $location) {
    if($window.sessionStorage.token){
	$scope.token = $window.sessionStorage.token;
	$scope.nom = $window.sessionStorage.nom;
	$scope.prenom = $window.sessionStorage.prenom;
    } else {
	$location.path('/admin/');
    }
}]);

angular.module('MainCtrl', ['ui.bootstrap', 'ngAnimate']).controller('MainController', function($scope, MainArticle) {
    // Trucs pour le carousel
    $scope.intervalImages = 7000;
    $scope.interval = 6000;
    $scope.slides = [
            { text : "Super Equipe !" },
            { text : "Pas Mal du tout" },
            { text : "J'ai trouvé un boulot !" }
        ];

    $scope.images = [
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
            { link :"http://lorempixel.com/1300/400/business/" },
        ];
});

angular.module('NavCtrl', []).controller('NavController', ['$scope', 'Nav', '$window', '$location', function($scope, Auth, $window, $location) {
    $scope.nom = $window.sessionStorage.nom;
    $scope.prenom = $window.sessionStorage.prenom;
}]);

angular.module('OffresCtrl', []).controller('OffresController', function($scope, Offre) {

    Offre.getOffres().then(function(res){
        $scope.offres = res.data;                
    });

});

angular.module('RecruteurCtrl', []).controller('RecruteurController', function($scope) {

	$scope.tagline = 'Tu es un Recruteur?';	

});

angular.module('StaffCtrl', []).controller('StaffController', function($scope) {

	$scope.tagline = 'Staff';	

});

angular.module('AdminService', []).factory('Admin', ['$http', '$window', '$location', function($http, $window, $location) {
    return {

    }
}]);

angular.module('AuthService', []).factory('Auth', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
    	loggin : function($scope) {
    	    return $http.post('/login', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
    	},
        logged: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return true;
                }
            }
            $location.path('/login');
            return false;
        },
        decodeToken: function(){
            var token   = $window.sessionStorage.token;
            if(token){
                var res = $http.post('/token/verify', { token: token });
                if(res.success){
                    return res.decoded
                }
            }
            return false;
        }
    }
}]);

angular.module('BenevoleService', []).factory('Benevole', ['$http', function($http) {
    return {
	getAppels : function() {
            return $http.get('/api/appelsBenevole');
        }
    }
}]);

angular.module('MainAdminService', []).factory('Main', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('MainService', []).factory('MainArticle', ['$http', function($http) {
    return {
        getArticles : function() {
            return $http.get('/api/mainArticles');
        }
    }       
}]);

angular.module('NavService', []).factory('Nav', ['$http', '$window', function($http, $window) {
    return {
	loggin : function($scope) {
	    return $http.post('/api/auth', { nom: $scope.user.nom, prenom: $scope.user.prenom, passwd: $scope.user.password });
	}
    }       
}]);

angular.module('OffresService', []).factory('Offre', ['$http', function($http) {
    return {
        // appel pour recup les offres
        getOffres : function() {
            return $http.get('/api/offres');
        }
    }
}]);

angular.module('RecruteurService', []).factory('Recruteur', ['$http', function($http) {
    return{
	getprofils : function() {
            return $http.get('/api/profils');
	},
    }
}]);

angular.module('StaffService', []).factory('Staff', ['$http', function($http) {
    return {
	// gestion des offres
        getOffres : function() {
            return $http.get('/api/offres');
        },
        createOffre : function(Data) {
            return $http.post('/api/offres', Data);
        },
        deleteOffre : function(id) {
            return $http.delete('/api/offres/' + id);
        },
	// gestion des profils
	getProfils : function() {
            return $http.get('/api/profils');
        },
        createProfil : function(Data) {
            return $http.post('/api/profils', Data);
        },
        deleteProfil : function(id) {
            return $http.delete('/api/profils/' + id);
        },
	// gestion des articles de la mainpage
	getMainArticles : function() {
            return $http.get('/api/mainArticles');
        },
        createMainArticle : function(Data) {
            return $http.post('/api/mainArticles', Data);
        },
        deleteMainArticle : function(id) {
            return $http.delete('/api/mainArticles/' + id);
        }
    }     
}]);
