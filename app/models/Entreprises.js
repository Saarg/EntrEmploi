var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var Edition = new mongoose.Schema({
    _editeur : ObjectId
    , date : {type : Date, default: Date()}
});

module.exports = mongoose.model('Entreprise', {
    _id : ObjectId
    // Info entreprise
    , nom : String
    , tel : String
    , mail : String
    , adresse : String
    , compAdresse : String
    , ville : String
    , codePostal : Number
    , description : String
    , site : String
    , photo : String
    // Liens avec les autre tables
    , _offres : ObjectId
    , _createur : ObjectId
    , _editeurs : [Edition]
});
