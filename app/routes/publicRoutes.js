var Offres = require('./../models/Offres');
var Profils = require('./../models/Profils');
var Entreprises = require('./../models/Entreprises');
var MainArticles = require('./../models/MainArticles');
var AppelsBenevole = require('./../models/AppelsBenevole');

module.exports = function(app) {
    app.get('/api/offres', function(req, res) {
        Offres.find(function(err, offres) {
            if (err)
                res.json({ success: false, message: err });
            res.json(offres);
        });
    });
    app.get('/api/profils', function(req, res) {
        Profils.find(function(err, profils) {
            if (err)
                res.json({ success: false, message: err });
            res.json(profils); 
        });
    });
    app.get('/api/entreprises', function(req, res) {
        Entreprises.find(function(err, entreprises) {
            if (err)
                res.json({ success: false, message: err });
            res.json(entreprises); 
        });
    });
    app.get('/api/mainArticles', function(req, res) {
        MainArticles.find(function(err, mainArticles) {
            if (err)
                res.json({ success: false, message: err });
            res.json(mainArticles); 
        });
    });
    app.get('/api/appelsBenevole', function(req, res) {
        AppelsBenevole.find(function(err, appels) {
            if (err)
                res.json({ success: false, message: err });
            res.json(appels); 
        });
    });
}
