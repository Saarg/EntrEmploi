module.exports = function(app, db, config) {
    // backend routes ===========================================================
    // authentication routes
    require('./routes/apiAuth')(app, config);

    // routes qui ne passent pas par le middleware, donc sans auth
    require('./routes/publicRoutes')(app);

    // Outils pour l'auth de la page admin et des entreprises
    require('./routes/Auth')(app);

    // middleware
    require('./routes/middleware')(app);

    // routes de l'api qui passent par le middleware
    require('./routes/Offres')(app);
    require('./routes/Prestations')(app);
    require('./routes/Staff')(app);
    require('./routes/Profils')(app);
    require('./routes/Partenaires')(app);
    require('./routes/MainArticles')(app);
    require('./routes/Config')(app);

    // Outils pour envoyer des mails
    require('./routes/mailSender')(app, config);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
