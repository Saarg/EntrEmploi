var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Prestation', {
    titre: String,
    description: String,
    inscrits: Number,
    _createur: ObjectId
});
