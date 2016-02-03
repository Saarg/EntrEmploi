# EntrEmploi
Site réallisé pour le secours populaire de brest dans le cardre de l'organisation Entr'Emploi.
https://www.secourspopulaire.fr/29/entremploi-0

Projet réalisé par Noé Maillard et Jean Milsonneau.

Fichiers de config a créer dans le dossier config/
  config.js
    module.exports = {
      secret: 'PhraseSecrette',
      mail:{
          host: 'smtp.bidon.fr',
          secureConnection: false,
          port: 587,
          user: 'bidon',
          passwd: 'passwdbidon',
          contact: 'addresse contact'
      }
    }
  
  db.js
    module.exports = {
    	url : 'mongodb://user:passwd@localhost/DBname'
    }



Installation

  -Cloner le git
  
  -Installer npm modules: npm install
  
  -Installer les dependences bower: bower install
  
  -Modifier les fichiers config
  
  -démarrer le serveur: node server.js
  
  -http://localhost:8080
  

