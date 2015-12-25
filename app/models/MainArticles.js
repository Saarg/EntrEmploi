var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('MainArticle', {
    titre : String,
    contenu : String,
    date : {type : Date, default: Date()},
    media : {type : String, default: 'Aucun'},
    lienMedia : String,
    _auteur : ObjectId,
    priority : {type : Number, default: -1}// -1:caché 0:brouillon x>0:ordre d'affichage
});
