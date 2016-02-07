// modules =================================================
var express        	= require('express');
var expressSession  = require('express-session');
var app            	= express();
var mongoose       	= require('mongoose');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

var passwordless    = require('passwordless');
var MongoStore      = require('passwordless-mongostore');
var nodemailer      = require('nodemailer');

var morgan      	= require('morgan');

var config          = require('./config/config.js');
var db              = require('./config/db');

// configuration ===========================================
app.use(morgan('dev')); // log every request to the console

mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var port = process.env.PORT || 8080; // set our port


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(expressSession({secret: '42', saveUninitialized: false, resave: false}));
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// init passwordless
passwordless.init(new MongoStore(db.url));
// passwordless delivery token
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
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
            to: uidToSend, // list of receivers
            subject: "Votre identification a Entr'Emploi", // Subject line
            text: "Acceder a votre compte ici: http://"+"localhost:8080/profils?token="+tokenToSend+"&uid="+encodeURIComponent(uidToSend), // plaintext body
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
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// routes ==================================================
app.post('/sendtoken', passwordless.requestToken(
        function(entreprise, delivery, callback, req) {
            callback(null, entreprise.email);
        }),
    function(req, res, next) {
        console.log("BOUM");
    });

require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
