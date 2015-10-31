var morgan = require('morgan');

module.exports = function(app) {
    // use morgan to log requests to the console
    app.use(morgan('dev'));

    // backend routes ===========================================================
    // authentication routes
    require('./routes/auth')(app);

    // api route
    require('./routes/Offres')(app);
    require('./routes/Staff')(app);
    require('./routes/Profils')(app);
    require('./routes/Entreprises')(app);
    require('./routes/MainArticles')(app);
    require('./routes/AppelsBenevole')(app);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });

};
