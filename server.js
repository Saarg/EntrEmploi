// modules =================================================
var express        	= require('express');
var app            	= express();
var mongoose       	= require('mongoose');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

var morgan      	= require('morgan');

// configuration ===========================================
app.use(morgan('dev')); // log every request to the console

// config files
var db = require('./config/db');
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '500mb' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
