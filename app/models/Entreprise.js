var mongoose = require('mongoose');

module.exports = mongoose.model('Entreprise', {
    mail: String,
    // Info perso
    nom : String,
    tel : String,
    adresse :String,
    compAdresse : String,
    ville : String,
    codePostal : Number,
});
