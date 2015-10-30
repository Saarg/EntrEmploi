var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var Edition = new mongoose.Schema({
    _editeur : ObjectId
    , date : {type : Date, default: Date()}
});

module.exports = mongoose.model('Offre', {
    titre : String
    , contenu : String
    , numContact : String
    , mailContact : String
    , date : {type : Date, default: Date()}
    , _createur : ObjectId
    , _editeurs : [Edition]
    , _entreprise : ObjectId
});

