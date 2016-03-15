var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;


module.exports = mongoose.model('Prestation', {
    titre: String,
    description: String,
    inscrits: [String],
    messageConfirmation : String,
    maxInscrits : Number,
    _createur: ObjectId
});
