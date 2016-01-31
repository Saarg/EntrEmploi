var Profils = require('./../models/Profils');
var fs      = require('fs');

module.exports = function(app) {
    // POST
    app.post('/api/profils', function(req, res) {
        var profil = new Profils();
        profil.nom = req.body.nom;
        profil.prenom = req.body.prenom;
        profil.ville = req.body.ville;
        profil.job = req.body.job;
        profil.accroche = req.body.accroche;
        profil._createur = req.decoded._id;

        profil.save(function(err, profil) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, profil: profil });
        });
    });
    // PUT
    app.put('/api/profils/:profil_id', function(req, res) {
        Profils.findById(req.params.profil_id, function(err, profil) {
            if (err) res.send(err);
            profil.nom = req.body.nom;
            profil.prenom = req.body.prenom;
            profil.ville = req.body.ville;
            profil.job = req.body.job;
            profil.accroche = req.body.accroche;
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
        fs.unlinkSync('public/CV/' + req.params.profil_id + '.pdf');
        Profils.remove({_id: req.params.profil_id}, function(err) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true });
        });
    });
    // Upload CV
    app.post('/api/profils/upload/:profil_id', function(req, res) {
        var data = new Buffer('');
        req.on('data', function(chunk) {
            data = Buffer.concat([data, chunk]);
        });
        req.on('end', function() {
            req.rawBody = data;
            fs.writeFile('public/CV/' + req.params.profil_id + '.pdf', data ,function(err){
                if(err) throw err;
            });

            Profils.findById(req.params.profil_id, function(err, profil) {
                if (err) res.send(err);
                profil.cv = true;
                profil.save(function(err) {
                    if (err) {
                        res.json({ success: false, message: err });
                        return;
                    }
                    res.json({ success: true });
                });
            });
        });
    });
}
