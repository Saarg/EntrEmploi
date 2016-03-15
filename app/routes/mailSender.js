var nodemailer  = require('nodemailer');

module.exports = function(app, config) {
    app.post('/mail/send', function(req, res) {
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
            to: req.body.receivers || config.mail.contact, // list of receivers
            subject: req.body.subject, // Subject line
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
