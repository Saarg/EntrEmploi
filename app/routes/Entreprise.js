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
}
