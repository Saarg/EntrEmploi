var Staff = require('./../models/Staff');

module.exports = function(app) {
    // GET
    app.get('/api/staff', function(req, res) {
        Staff.find(function(err, staff) {
            if (err)
                res.json({ success: false, message: err });
            res.json(staff);
        });
    });
    // POST
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
                res.json({ success: false, message: err });
            res.json({ success: true });
        });
    });
    // PUT
    ///TODO
    // DELETE
    app.delete('/api/staff/:staff_id', function(req, res) {
	Staff.remove({_id: req.params.staff_id}, function(err, staff) {
            if (err)
                res.json({ success: false, message: err });
            res.json({ success: true });
        });	
    });
}
