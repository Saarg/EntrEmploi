var Offres = require('./models/Offres');
var Profils = require('./models/Profils');
var Entreprises = require('./models/Entreprises');
var Staff = require('./models/Staff');
var MainArticles = require('./models/MainArticles');

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
    app.get('/api/profils', function(req, res) {
        Profils.find(function(err, profils) {
            if (err)
                res.send(err);
            res.json(profils); 
        });
    });
    app.get('/api/entreprises', function(req, res) {
        Entreprises.find(function(err, entreprises) {
            if (err)
                res.send(err);
            res.json(entreprises); 
        });
    });
    app.get('/api/staff', function(req, res) {
        Staff.find(function(err, staff) {
            if (err)
                res.send(err);
            res.json(staff); 
        });
    });
    app.get('/api/mainArticles', function(req, res) {
        MainArticles.find(function(err, mainArticles) {
            if (err)
                res.send(err);
            res.json(mainArticles); 
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};
