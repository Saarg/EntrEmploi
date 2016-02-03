# EntrEmploi
Site réallisé pour le secours populaire de brest dans le cardre de l'organisation Entr'Emploi.
https://www.secourspopulaire.fr/29/entremploi-0

Projet réalisé par Noé Maillard et Jean Milsonneau.

# Fichiers de config a créer 
## config/config.js
```
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
```
## config/db.js
```
module.exports = {
	url : 'mongodb://user:passwd@localhost/DBname'
}
```


# Installation
1. Cloner le git
2. Installer npm modules: npm install
3. Installer les dependences bower: bower install
4. Modifier les fichiers config
5. démarrer le serveur: node server.js
6. http://localhost:8080
  

