var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// Schema pour une ligne de cv
var Lignes = new mongoose.Schema({
    date : Date
    , nom : String
    , dersciption : String
});

// Schema d'un cv
var CV = new mongoose.Schema({
    nom : String
    , lignes : [Lignes]
});

// Schema d'historique des éditions
var Edition = new mongoose.Schema({
    _editeur : ObjectId
    , date : {type : Date, default: Date()}
    , lignesOld : [Lignes]
    , lignesNew : [Lignes]
});

module.exports = mongoose.model('Profil', {
    // Info perso
    nom : String
    , prenom : String
    , tel : String
    , mail : String
    , adresse :String
    , compAdresse : String
    , ville : String
    , codePostal : Number
    , dateNaissance : Date
    , photo : String
    // CV rangé par categories avec un titre et n linges[date nom description]
    , categories : [CV]
    // Historique profil createur et editions
    , _createur : ObjectId
    , _editions : [Edition]
});
