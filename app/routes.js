var fs      = require('fs');
var passwordless    = require('passwordless');

module.exports = function(app) {
    // backend routes ===========================================================
    // authentication routes
    require('./routes/apiAuth')(app);

    // routes qui ne passent pas par le middleware, donc sans auth (GET only)
    require('./routes/publicRoutes')(app);

    // Outils pour l'auth de la page admin et des entreprises
    require('./routes/Auth')(app);

    // middleware
    require('./routes/middleware')(app);

    // routes de l'api qui passent par le middleware
    require('./routes/Offres')(app);
    require('./routes/Staff')(app);
    require('./routes/Profils')(app);
    require('./routes/Partenaires')(app);
    require('./routes/MainArticles')(app);
    require('./routes/Config')(app);

    // Outils pour envoyer des mails
    require('./routes/mailSender')(app);

    app.get('/CV/:profil_id', passwordless.restricted(), function(req, res) {
        var filename = req.params.profil_id+".pdf";

        fs.readFile("./public/CV/"+filename, function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
