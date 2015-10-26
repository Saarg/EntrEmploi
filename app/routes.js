var Offres = require('./models/Offres');
var Profils = require('./models/Profils');
var Entreprises = require('./models/Entreprises');
var Staff = require('./models/Staff');
var MainArticles = require('./models/MainArticles');
var AppelsBenevole = require('./models/AppelsBenevole');

module.exports = function(app) {

    // backend routes ===========================================================
    // authentication routes

    // api route
    app.get('/api/offres', function(req, res) {
        Offres.find(function(err, offres) {
            if (err)
                res.send(err);
            res.json(offres);
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
    app.get('/api/appelsBenevole', function(req, res) {
        AppelsBenevole.find(function(err, appels) {
            if (err)
                res.send(err);
            res.json(appels); 
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};
