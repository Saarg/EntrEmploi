// modules =================================================
var jwt            = require('jsonwebtoken');
var Users           = require('../../app/models/Staff');

module.exports = function(app) {
    app.post('/token/verify', function(req, res) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    res.json({ success: true, decoded: decoded });
                }
            });

        } else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // process the login form
    app.post('/login', function(req, res){
        var nom         = req.body.nom;
        var prenom      = req.body.prenom;
        var password    = req.body.passwd;

        Users.findOne({ 'nom' :  nom, 'prenom' :  prenom }, function(err, user) {
            if (err)
                res.json({ success: false, message: err });
            else if (!user)
                res.json({ success: false, message: 'No user found' });
            else if (!user.validPassword(password))
                res.json({ success: false, message: 'Oops Wrong password' });
            else {
                var token = jwt.sign({ _id:user._id, nom:user.nom, prenom:user.prenom}, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({ success: true, message:'bonjour', user: user, token: token });
            }
        });
    });
}
