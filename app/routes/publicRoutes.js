var Offres = require('./../models/Offres');
var Profils = require('./../models/Profils');
var Entreprises = require('./../models/Partenaires');
var MainArticles = require('./../models/MainArticles');

module.exports = function(app) {
    // Offres
    app.get('/api/offres', function(req, res) {
        Offres.find(function(err, offres) {
            if (err)
                res.json({ success: false, message: err });
            res.json(offres);
        });
    });
    app.get('/api/offres/count', function(req, res) {
        Offres.count(function(err, count) {
            if (err)
                res.send(err)
            res.json(count);
        });
    });
    // Profils
    app.get('/api/profils', function(req, res) {
        Profils.find(function(err, profils) {
            if (err)
                res.json({ success: false, message: err });
            res.json(profils);
        });
    });
    app.get('/api/profils/count', function(req, res) {
        Profils.count(function(err, count) {
            if (err)
                res.send(err)
            res.json(count);
        });
    });
    // Partenaires
    app.get('/api/partenaires', function(req, res) {
        Entreprises.find(function(err, entreprises) {
            if (err)
                res.json({ success: false, message: err });
            res.json(entreprises);
        });
    });
    app.get('/api/partenaires/count', function(req, res) {
        Entreprises.count(function(err, count) {
            if (err)
                res.send(err)
            res.json(count);
        });
    });
    // Articles
    app.get('/api/mainArticles', function(req, res) {
        MainArticles.find(function(err, mainArticles) {
            if (err)
                res.json({ success: false, message: err });
            res.json(mainArticles);
        });
    });
    app.get('/api/mainArticles/count', function(req, res) {
        MainArticles.count(function(err, count) {
            if (err)
                res.send(err)
            res.json(count);
        });
    });
}
