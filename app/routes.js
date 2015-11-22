// modules =================================================
var morgan         = require('morgan');
var jwt            = require('jsonwebtoken');

module.exports = function(app) {
    // use morgan to log requests to the console
    app.use(morgan('dev'));

    // backend routes ===========================================================
    // authentication routes
    require('./routes/auth')(app);

    // routes qui ne passent pas par le middleware, donc sans auth (GET only)
    require('./routes/publicRoutes')(app);

    app.get('/admin/login', function(req, res) {
	res.sendfile('./public/admin.html');
    });
    
    // middleware
    require('./routes/middleware')(app);

    // routes de l'api qui passent par le middleware
    require('./routes/Offres')(app);
    require('./routes/Staff')(app);
    require('./routes/Profils')(app);
    require('./routes/Partenaires')(app);
    require('./routes/MainArticles')(app);

    // frontend routes =========================================================
    app.get('/admin/*', function(req, res) {
	res.sendfile('./public/admin.html');
    });   
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};

