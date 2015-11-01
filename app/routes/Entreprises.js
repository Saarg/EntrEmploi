var Entreprises = require('./../models/Entreprises');

module.exports = function(app) {
    // GET
    app.get('/api/entreprises', function(req, res) {
        Entreprises.find(function(err, entreprises) {
            if (err)
                res.send(err);
            res.json(entreprises); 
        });
    });
    // POST
    ///TODO
    // PUT
    ///TODO
    // DELETE
    ///TODO
}
