var Offres = require('./../models/Offres');

module.exports = function(app) {
    // GET
    app.get('/api/offres', function(req, res) {
        Offres.find(function(err, offres) {
            if (err)
                res.send(err);
            res.json(offres);
        });
    });
    // POST
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
                res.send(err);
            res.json({ message: 'Succes' });
        });
    });
    // PUT
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
    // DELETE
    app.delete('/api/offres/:offre_id', function(req, res) {
	Offres.remove({_id: req.params.offre_id}, function(err, offre) {
            if (err)
                res.send(err);
            res.json({ message: 'Succes' });
        });	
    });
}
