var nodemailer  = require('nodemailer');
var config      = require('./../config/config.js');

module.exports = function(app) {
    // backend routes ===========================================================
    // authentication routes
    require('./routes/apiAuth')(app);

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

    require('./routes/Auth')(app);

    app.post('/contact/send', function(req, res) {
        var transporter = nodemailer.createTransport("SMTP", {
            host: config.mail.host,
            secureConnection: config.mail.secureConnection,
            port: config.mail.port,
            auth: {
                user: config.mail.user,
                pass: config.mail.passwd
            }
        });
        var mailOptions = {
            from: req.body.sender, // sender address
            to: 'milsonneau.jean@free.fr', // list of receivers
            subject: req.body.sujet, // Subject line
            text: req.body.message, // plaintext body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + req.body.message);

        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
