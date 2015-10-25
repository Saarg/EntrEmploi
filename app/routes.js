var Offres = require('./models/Offres');

module.exports = function(app) {

    // backend routes ===========================================================
    // api 
    // authentication routes

    // api route
    app.get('/api/offres', function(req, res) {
        // Recuperation de toutes les offres dans la db avec mongoose
        Offres.find(function(err, offres) {

            // Si pb 
            if (err)
                res.send(err); // Return
	    
	    // TODO alert si temps de recherche trop long
            res.json(offres); // retourne les offres sur un format json
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};
