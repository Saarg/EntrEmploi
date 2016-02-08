var passwordless    = require('passwordless');
var MongoStore      = require('passwordless-mongostore');
var nodemailer      = require('nodemailer');
var fs              = require('fs');

module.exports = function(app, db, config) {
    // init passwordless
    passwordless.init(new MongoStore(db.url));
    // passwordless delivery token
    passwordless.addDelivery(
        function(tokenToSend, email, recipient, callback) {
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
                from: 'milsonneau.jean@free.fr', // sender address
                to: email, // list of receivers
                subject: "Votre identification a Entr'Emploi", // Subject line
                text: "Acceder a votre compte ici: http://"+"localhost:8080/profils?token="+tokenToSend+"&uid="+encodeURIComponent(email), // plaintext body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.error(error);
                } else {
                    console.log("message envoyé");
                }
            });
    });
    // passwordless middleware
    app.use(passwordless.sessionSupport());
    app.use(passwordless.acceptToken({ successRedirect: '/profils'}));

    // route pour envoyer les tokens passwordless
    app.post('/passwordless/sendtoken', passwordless.requestToken(
        function(entreprise, delivery, callback, req) {
            callback(null, entreprise.email);
        }),
    function(req, res, next) {
        console.log("BOUM");
    });

    // route pour lire les CV
    app.get('/CV/:profil_id', passwordless.restricted(), function(req, res) {
        var filename = req.params.profil_id+".pdf";

        fs.readFile("./public/CV/"+filename, function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });
    // signal le loggedIn
    app.get('/passwordless/isLoggedIn', function(req, res) {
        if(req.user){
            res.json({ loggedIn: true, entreprise: req.user });
        } else{
            res.json({ loggedIn: false });
        }
    });

}
