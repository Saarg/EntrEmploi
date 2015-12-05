// modules =================================================
var jwt            = require('jsonwebtoken');
var User           = require('../app/models/Staff');

module.exports = function(app) {
    // backend routes ===========================================================
    // authentication routes
    require('./routes/auth')(app);

    // routes qui ne passent pas par le middleware, donc sans auth (GET only)
    require('./routes/publicRoutes')(app);

    // middleware
    require('./routes/middleware')(app);

    // routes de l'api qui passent par le middleware
    require('./routes/Offres')(app);
    require('./routes/Staff')(app);
    require('./routes/Profils')(app);
    require('./routes/Partenaires')(app);
    require('./routes/MainArticles')(app);

    // process the login form
    app.post('/login', function(req, res){
        nom         = req.body.nom;
        prenom      = req.body.prenom;
        password    = req.body.passwd;

        User.findOne({ 'nom' :  nom, 'prenom' :  prenom }, function(err, user) {
            if (err)
                res.json({ success: false, message: err });
            else if (!user)
                res.json({ success: false, message: 'No user found' });
            else if (!user.validPassword(password))
                res.json({ success: false, message: 'Oops Wrong password' });
            else{
                var token = jwt.sign(user._id, app.get('superSecret'), {
    			             expiresIn: 86400 // expires in 24 hours
    		    });
                res.json({ success: true, message:'bonjour', user: user, token: token });
            }
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
