var Offres = require('./../models/Offres');

module.exports = function(app) {
    // POST
    app.post('/api/offres', function(req, res) {
        var offre = new Offres();
        offre.titre = req.body.titre;
        offre.contenu = req.body.contenu;
        offre.entreprise = req.body.entreprise;
        offre.siteEntreprise = req.body.siteEntreprise;
        offre.numContact = req.body.numContact;
        offre.mailContact = req.body.mailContact;
        offre.date = Date();
        offre.dateFin = req.body.dateFin;
        offre._createur = req.body._createur;

        offre.save(function(err) {
            if (err)
            res.json({ success: false, message: err });
            res.json({ success: true });
        });
    });
    // PUT
    app.put('/api/offres/:offre_id', function(req, res) {
        Offres.findById(req.params.offre_id, function(err, offre) {
            if (err)
            res.send(err);
            offre.titre = req.body.titre;
            offre.contenu = req.body.contenu;
            offre.entreprise = req.body.entreprise;
            offre.siteEntreprise = req.body.siteEntreprise;
            offre.numContact = req.body.numContact;
            offre.mailContact = req.body.mailContact;
            offre.dateFin = req.body.dateFin;

            offre.save(function(err) {
                if (err)
                res.json({ success: false, message: err });
                res.json({ success: true });
            });
        });
    });
    // DELETE
    app.delete('/api/offres/:offre_id', function(req, res) {
        Offres.remove({_id: req.params.offre_id}, function(err, offre) {
            if (err)
            res.json({ success: false, message: err });
            res.json({ success: true });
        });
    });
}
