var Staff           = require('./../models/Staff');

module.exports = function(app) {
    // GET
    app.get('/api/staff', function(req, res) {
        Staff.find(function(err, staff) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json(staff);
        });
    });
    app.get('/api/staff/:staff_id', function(req, res) {
        Staff.find({ _id:req.params.staff_id },function(err, staff) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
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
    	staff.accesLevel = req.body.accesLevel;
    	staff.passwd = staff.generateHash(req.body.passwd);

    	staff.save(function(err, user) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, user: user });
        });
    });
    // PUT
    app.put('/api/staff/:staff_id', function(req, res) {
        Staff.findById(req.params.staff_id, function(err, staff) {
            if (err) res.send(err);
            staff.nom = req.body.nom;
            staff.prenom = req.body.prenom;
            staff.tel = req.body.tel;
            staff.mail = req.body.mail;
            staff.adresse = req.body.adresse;
            staff.compAdresse = req.body.compAdresse;
            staff.ville = req.body.ville;
            staff.codePostal = req.body.codePostal;
            staff.accesLevel = req.body.accesLevel
            if(req.body.newPasswd) {
                staff.passwd = staff.generateHash(req.body.newPasswd);
            }

            staff.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err });
                    return;
                }
                res.json({ success: true });
            });
        });
    });
    // DELETE
    app.delete('/api/staff/:staff_id', function(req, res) {
	Staff.remove({_id: req.params.staff_id}, function(err, staff) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true });
        });
    });
}
