var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var Edition = new mongoose.Schema({
    _editeur : ObjectId
    , date : {type : Date, default: Date()}
});

module.exports = mongoose.model('MainArticle', {
    titre : String
    , contenu : String
    , date : {type : Date, default: Date()}
    , _auteur : ObjectId
    , _editeurs : [Edition]
    , priority : {type : Number, default: -1}// -1:caché 0:brouillon x>0:ordre d'affichage
});

