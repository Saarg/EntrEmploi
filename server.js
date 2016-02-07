// modules =================================================
var express        	= require('express');
var expressSession  = require('express-session');
var app            	= express();
var mongoose       	= require('mongoose');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

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

// passwordless ============================================
require('./app/passwordless')(app, db, config);

// routes ==================================================
require('./app/routes')(app, db, config); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
