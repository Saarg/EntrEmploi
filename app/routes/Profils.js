var Profils = require('./../models/Profils');

module.exports = function(app) {
    // GET
    app.get('/api/profils', function(req, res) {
        Profils.find(function(err, profils) {
            if (err)
                res.send(err);
            res.json(profils); 
        });
    });
    // POST
    ///TODO
    // PUT
    ///TODO
    // DELETE
    ///TODO
}
