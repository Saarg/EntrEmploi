var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var ObjectId = mongoose.Schema.Types.ObjectId;

var StaffSchema = mongoose.Schema({
    // Info perso
    nom : String,
    prenom : String,
    tel : String,
    mail : String,
    adresse :String,
    compAdresse : String,
    ville : String,
    codePostal : Number,
    accesLevel : {type : Number, default: 0},// 0:lecture cv & offre 1:creation/edition/suppression cv & offres 3:edition contenu du site
    // Liste des profils contribué
    _profils : [ObjectId],
    // Mot de passe encrypter
    passwd : String // bcrypt
});

// methods ======================
StaffSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
StaffSchema.methods.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.passwd);
    return password == this.passwd;
};

module.exports = mongoose.model('Staff', StaffSchema);
