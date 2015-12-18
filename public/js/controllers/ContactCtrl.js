angular.module('ContactCtrl', []).controller('ContactController', ['$scope', function($scope) {

	$scope.submit = function () {
		//TODO envoyer le mail depuis le site avec node-mandrill apr exemple
		if(!$scope.mail.sujet)
			$scope.error = "Vous n'avez pas précisé le sujet de votre message."
		else if(!$scope.mail.message)
			$scope.error = "Vous n'avez pas entré de message."
		else
			window.open('mailto:j3milson@enib.fr?subject=' + $scope.mail.sujet + '&body=' + $scope.mail.message);
	};

}]);
