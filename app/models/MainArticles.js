// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('MainArticles', {
    titre : {type : String, default: 'Titre'}
    contenu : {type : String, default: 'contenu'}
    date : {type : Date, default: Date()}
    auteur : {type : Schema.Types.ObjectId}
});

