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
    app.post('/api/offres', function(req, res) {
	var offre = new Offres();
	offre.titre = req.body.titre;
	offre.contenu = req.body.contenu;
	offre.numContact = req.body.numContact;
	offre.mailContact = req.body.mailContact;
	offre.date = Date();

	offre.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Succes' });
        });
    });
    // route to handle updates goes here (app.put)
    app.put('/api/offres/:offre_id', function(req, res) {
	Offres.findById(req.params.offre_id, function(err, offre) {
            if (err)
                res.send(err);
            offre.titre = req.body.titre;
            offre.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Succes' });
            });
        });
    });
    // route to handle delete goes here (app.delete)
    app.delete('/api/offres/:offre_id', function(req, res) {
	Offres.remove({_id: req.params.offre_id}, function(err, offre) {
            if (err)
                res.send(err);
            res.json({ message: 'Succes' });
        });	
    });

    // frontend routes =========================================================
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};
