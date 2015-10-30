var morgan = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./../config/config'); // get our config file

var Offres = require('./models/Offres');
var Profils = require('./models/Profils');
var Entreprises = require('./models/Entreprises');
var Staff = require('./models/Staff');
var MainArticles = require('./models/MainArticles');
var AppelsBenevole = require('./models/AppelsBenevole');

module.exports = function(app) {
    // use morgan to log requests to the console
    app.use(morgan('dev'));

    // backend routes ===========================================================
    // authentication routes
    app.set('superSecret', config.secret); // secret variable

    app.post('/api/auth', function(req, res) {
	Staff.findOne({
	    nom: req.body.nom
	}, function(err, user) {
	    if (err) throw err;

	    if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

		// check if password matches
		if (user.passwd != req.body.passwd) {
		    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		} else {

		    // if user is found and password is right
		    // create a token
		    var token = jwt.sign(user, app.get('superSecret'), {
			expiresInMinutes: 1440 // expires in 24 hours
		    });

		    // return the information including token as JSON
		    res.json({
			success: true,
			message: 'Enjoy your token!',
			token: token
		    });
		}   

	    }
	});
    });
    

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
	offre._createur = req.body._createur;
	offre._entreprise = req.body._entreprise;

	offre.save(function(err) {
            if (err)
                res.send(err); return;
            res.json({ message: 'Succes' });
        });
    });
    app.post('/api/staff', function(req, res) {
	var staff = new Staff();
	staff.nom = req.body.nom;
	staff.prenom = req.body.prenom;
	staff.tel = req.body.tel;
	staff.mail = req.body.mail;
	staff.adresse = req.body.adresse;
	staff.compAdresse = req.body.compAdresse;
	staff.ville = req.body.ville;
	staff.codePostal = req.body.codePostal;
	staff.accesLevel = req.body.accesLecel;
	staff.passwd = req.body.passwd;

	staff.save(function(err) {
            if (err)
                res.send(err); return;
            res.json({ message: 'Succes' });
        });
    });
    // route to handle updates goes here (app.put)
    app.put('/api/offres/:offre_id', function(req, res) {
	Offres.findById(req.params.offre_id, function(err, offre) {
            if (err)
                res.send(err);
            offre.titre = req.body.titre;
	    offre.contenu = req.body.contenu;
	    offre.numContact = req.body.numContact;
	    offre.mailContact = req.body.mailContact;
	    offre._entreprise = req.body._entreprise;
	    // TODO liste des editeurs

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
    app.delete('/api/staff/:staff_id', function(req, res) {
	Staff.remove({_id: req.params.staff_id}, function(err, staff) {
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
