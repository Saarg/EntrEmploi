var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./../../config/config'); // get our config file
var Staff = require('./../models/Staff');

module.exports = function(app) {
    app.set('superSecret', config.secret); // secret variable

    app.post('/api/auth', function(req, res) {
        Staff.findOne({
            nom: req.body.nom,
            prenom: req.body.prenom
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.passwd != req.body.passwd) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({ _id:user._id, nom:user.nom, prenom:user.prenom}, app.get('superSecret'), {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        nom: user.nom,
                        prenom: user.prenom
                    });
                }

            }
        });
    });
}
