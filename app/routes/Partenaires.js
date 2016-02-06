var Partenaires = require('./../models/Partenaires');

module.exports = function(app) {
    // POST
    app.post('/api/partenaires', function(req, res) {
        var partenaire = new Partenaires();
        partenaire.nom = req.body.nom;
        partenaire.site = req.body.site;

        partenaire.save(function(err, partenaire) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, partenaire: partenaire });
        });
    });
    // PUT
    app.put('/api/partenaires/:partenaire_id', function(req, res) {
        Partenaires.findById(req.params.partenaire_id, function(err, partenaire) {
            if (err) res.send(err);
            partenaire.nom = req.body.nom;
            partenaire.site = req.body.site;

            partenaire.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err });
                    return;
                }
                res.json({ success: true });
            });
        });
    });
    // DELETE
    app.delete('/api/partenaires/:partenaire_id', function(req, res) {
        Partenaires.remove({_id: req.params.partenaire_id}, function(err, partenaire) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true });
        });
    });
}
