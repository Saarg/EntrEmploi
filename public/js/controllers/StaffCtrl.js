angular.module('StaffCtrl', []).controller('StaffController', StaffController);

StaffController.$inject = ['$scope'];

function StaffController($scope) {

    $scope.tagline = 'Staff';

}
