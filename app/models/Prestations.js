var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var Participant = new mongoose.Schema({
    email : String
});

module.exports = mongoose.model('Prestation', {
    titre: String,
    description: String,
    inscrits: [Participant],
    maxInscrits : Number,
    _createur: ObjectId
});
