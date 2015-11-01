var AppelsBenevole = require('./../models/AppelsBenevole');

module.exports = function(app) {
    // GET
    app.get('/api/appelsBenevole', function(req, res) {
        AppelsBenevole.find(function(err, appels) {
            if (err)
                res.send(err);
            res.json(appels); 
        });
    });
    // POST
    ///TODO
    // PUT
    ///TODO
    // DELETE
    ///TODO
}
