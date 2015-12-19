angular.module('ContactCtrl', []).controller('ContactController', ['$scope', 'Contact', function($scope, Contact) {
	sended = false;
	$scope.submit = function () {
		if(sended)
			return false;

		if(!$scope.mail.sujet)
			$scope.error = "Vous n'avez pas précisé le sujet de votre message.";
		else if(!$scope.mail.message)
			$scope.error = "Vous n'avez pas entré de message.";
		else if(!$scope.mail.nom)
			$scope.error = "Vous n'avez pas donné votre nom ou prenom.";
		else if(!$scope.mail.email)
			$scope.error = "Vous n'avez pas entré votre adresse mail";
		else {
			rep = Contact.sendMail($scope);
			if(rep.success){
				$scope.message = "Votre message a bien été envoyé.";
				$scope.error = false;
				sended = true;
			} else {
				$scope.error = rep.error;
			}
		}
	};

}]);
