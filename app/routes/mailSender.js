var nodemailer  = require('nodemailer');
var config      = require('./../../config/config.js');


module.exports = function(app) {
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
                res.json({ success: false, error: error });
                return;
            }
            res.json({ success: true});
        });
    });
}
