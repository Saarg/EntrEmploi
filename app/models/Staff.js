var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Staff', {
    _id : ObjectId
    // Inof perso
    , nom : String
    , prenom : String
    , tel : String
    , mail : String
    , adresse :String
    , compAdresse : String
    , ville : String
    , codePostal : Number
    , accesLevel : {type : Number, default: 0}// 0:lecture cv & offre 1:creation/edition/suppression cv & offres 3:edition contenu du site
    // Liste des profils contribué
    , _profils : [ObjectId]
    // Mot de passe encrypter
    , passwd : String // bcrypt??
});
