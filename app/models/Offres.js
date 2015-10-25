var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
// module.exports = mongoose.model(nomModele, scheme, collec(optionnal) 
// si il n'y a pas de collection mongoose cherche le pluriel de nomModele en minuscule!
module.exports = mongoose.model('Offre', {
    titre : {type : String, default: 'Titre'}
    , contenu : {type : String, default: 'Contenu'}
    , date : {type : Date, default: Date()}
    // , auteur : {type : Schema.Types.ObjectId}
    // , entreprise : {type : Schema.Types.ObjectId}
});

