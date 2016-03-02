var Offres          = require('./../models/Offres');
var Profils         = require('./../models/Profils');
var Entreprises     = require('./../models/Partenaires');
var MainArticles    = require('./../models/MainArticles');
var Prestations     = require('./../models/Prestations');
var Configs         = require('./../models/Config');
var Entreprise      = require('./../models/Entreprise');



module.exports = function(app) {
    // Config
    app.get('/api/config/:name', function(req, res) {
        Configs.findOne({ name:req.params.name },function(err, config) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            if(config)
                res.json(config.value);
            else
                res.json(null);
        });
    });
    app.get('/api/config/all/:name', function(req, res) {
        Configs.find({ name:req.params.name },function(err, configs) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            if(configs)
                res.json(configs);
            else
                res.json(null);
        });
    });
    // Offres
    app.get('/api/offres', function(req, res) {
        Offres.find(function(err, offres) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(offres);
        });
    });
    app.get('/api/offres/count', function(req, res) {
        Offres.count(function(err, count) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(count);
        });
    });
    // Profils
    app.get('/api/profils', function(req, res) {
        Profils.find(function(err, profils) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(profils);
        });
    });
    app.get('/api/profils/count', function(req, res) {
        Profils.count(function(err, count) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(count);
        });
    });
    // Partenaires
    app.get('/api/partenaires', function(req, res) {
        Entreprises.find(function(err, entreprises) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(entreprises);
        });
    });
    app.get('/api/partenaires/count', function(req, res) {
        Entreprises.count(function(err, count) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(count);
        });
    });
    // Articles
    app.get('/api/mainArticles', function(req, res) {
        MainArticles.find(function(err, mainArticles) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(mainArticles);
        });
    });

    app.get('/api/mainArticles/count', function(req, res) {
        MainArticles.count(function(err, count) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(count);
        });
    });
    // Entreprises
    app.get('/api/entreprise/:mail', function(req, res) {
        Entreprise.findOne({ mail:req.params.mail },function(err, entreprise) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(entreprise);
        });
    });
    app.get('/api/entreprise/count', function(req, res) {
        Entreprise.count(function(err, count) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(count);
        });
    });
    app.put('/api/entreprise/:entreprise_id', function(req, res) {
        Entreprise.findById(req.params.entreprise_id, function(err, entreprise) {
            if (err) res.send(err);
            entreprise.mail = req.body.mail;
            entreprise.nom = req.body.nom;
            entreprise.tel = req.body.tel;
            entreprise.adresse = req.body.adresse;
            entreprise.compAdresse = req.body.compAdresse;
            entreprise.ville = req.body.ville;
            entreprise.codePostal = req.body.codePostal;

            entreprise.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err });
                    return;
                }
                res.json({ success: true });
            });
        });
    });

    // Prestations
    app.get('/api/prestations', function (req, res) {
        Prestations.find(function (err, Prestations) {
            if (err) {
                res.json({ success: false, message: err});
                return;
            }
            res.json(Prestations);
        })
    });


    app.put('/prestations/:prestation_id/:email', function (req, res) {
        Prestations.findById(req.params.prestation_id, function (err, prestation) {
            if(err) {
                res.send(err);
                return;
            }
            prestation.inscrits.push(req.params.email);

            prestation.save(function (err) {
                if(err) {
                    res.json({success: false, message: err})
                    return;
                }

                res.json({success: true});
            })
        })
    });
}
