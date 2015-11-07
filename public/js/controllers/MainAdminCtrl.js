angular.module('MainAdminCtrl', []).controller('MainAdminController', ['$scope', 'Main', 'Auth', '$window', function($scope, Main, Auth, $window) {

    $scope.token = $window.sessionStorage.token;

}]);
