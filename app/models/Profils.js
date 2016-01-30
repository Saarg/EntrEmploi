var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Profil', {
    // Info perso
    nom : String,
    prenom : String,
    ville : String,
    job : String,
    cv : { type: Boolean, default: false},
    accroche : String,
    _createur : ObjectId,
    _editeur : ObjectId
});
