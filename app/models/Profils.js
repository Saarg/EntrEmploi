var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// Schema d'historique des éditions
var Edition = new mongoose.Schema({
    _editeur : ObjectId,
    date : {type : Date, default: Date()}
});

module.exports = mongoose.model('Profil', {
    // Info perso
    nom : String,
    prenom : String,
    tel : String,
    mail : String,
    adresse :String,
    compAdresse : String,
    ville : String,
    codePostal : Number,
    dateNaissance : Date,
    photo : String,
    CV : String,
    accroche : String,
    job : String,
    _createur : ObjectId,
    _editions : [Edition]
});
