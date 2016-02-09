var Entreprise = require('./../models/Entreprise');

module.exports = function(app) {
    // GET
    app.get('/api/entreprise', function(req, res) {
        Entreprise.find(function(err, entreprise) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(entreprise);
        });
    });
    app.get('/api/entreprise/:mail', function(req, res) {
        Entreprise.findOne({ mail:req.params.mail },function(err, entreprise) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(entreprise);
        });
    });
    // POST
    app.post('/api/entreprise', function(req, res) {
	    var entreprise = new Entreprise();
    	entreprise.mail = req.body.mail;

    	entreprise.save(function(err, e) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, entreprise: e });
        });
    });
    // PUT
    app.put('/api/entreprise/:entreprise_id', function(req, res) {
        Entreprise.findById(req.params.staff_id, function(err, e) {
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
}
