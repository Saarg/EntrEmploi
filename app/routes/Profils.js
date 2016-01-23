var Profils = require('./../models/Profils');

module.exports = function(app) {
    // POST
    app.post('/api/profils', function(req, res) {
        var profil = new Profils();
        profil.nom = req.body.nom;
        profil.prenom = req.body.prenom;
        profil.accroche = req.body.accroche;
        profil.CV = req.body.CV;
        profil._createur = req.decoded._id;

        profil.save(function(err) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true });
        });
    });
    // PUT
    app.put('/api/profils/:profil_id', function(req, res) {
        Profils.findById(req.params.profil_id, function(err, profil) {
            if (err) res.send(err);
            profil.nom = req.body.nom;
            profil.prenom = req.body.prenom;
            profil.accroche = req.body.accroche;
            profil.CV = req.body.CV;
            profil._editeur = req.decoded._id;

            profil.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err });
                    return;
                }
                res.json({ success: true });
            });
        });
    });
    // DELETE
    app.delete('/api/profils/:profil_id', function(req, res) {
        Profils.remove({_id: req.params.profil_id}, function(err) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true });
        });
    });
}
