var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Offre', {
    titre : String
    , contenu : String
    , entreprise : String
    , siteEntreprise : String
    , numContact : String
    , mailContact : String
    , categ : String
    , location : String
    , contract : String
    , date : {type : Date, default: Date()}
    , dateFin : Date
    , _createur : ObjectId
});

