var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

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
    _editeur : ObjectId
});
