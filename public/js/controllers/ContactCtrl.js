angular.module('ContactCtrl', []).controller('ContactController', ['$scope', 'Contact', function($scope, Contact) {

	$scope.submit = function () {
		if(!$scope.mail.sujet)
			$scope.error = "Vous n'avez pas précisé le sujet de votre message."
		else if(!$scope.mail.message)
			$scope.error = "Vous n'avez pas entré de message."
		else if(!$scope.mail.nom || !$scope.mail.prenom)
			$scope.error = "Vous n'avez pas donné votre nom ou prenom."
		else if(!$scope.mail.phone && !$scope.mail.email)
			$scope.error = "Vous n'avez pas entré d'information de contact."
		else
			Contact.sendMail($scope);
	};

}]);
